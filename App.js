import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
  ImageBackground,
  TextInput,
} from "react-native";
import { useState, useCallback } from "react";
import axios from "axios";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  image: {
    flex: 1,
    flexDirection: "column",
  },
  textInput: {
    borderBottomWidth: 3,
    padding: 5,
    paddingVertical: 20,
    marginVertical: 100,
    marginHorizontal: 10,
    backgroundColor: "#ddd",
    fontSize: 19,
    borderRadius: 16,
    borderBottomColor: "#df8e00",
  },
  infoView: {
    alignItems: "center",
  },
  cityCountryText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 22,
    marginVertical: 10,
  },
  tempText: {
    fontSize: 45,
    marginVertical: 10,
  },
  minMaxText: {
    fontSize: 22,
    marginVertical: 10,
    fontWeight: "500",
  },
});

export default function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const api = {
    key: "189182eec5a49486e5229f22f6aa39f5",
    baseUrl: "https://api.openweathermap.org/data/2.5/",
  };

  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    setInput("");
    axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`,
    })
      .then((res) => {
        // console.log(res.data)
        setData(res.data);
      })
      .catch((e) => console.dir(e))
      .finally(() => setLoading(false));
  }, [api.key, input]);

  return (
    <View style={styles.root}>
      <Text>Check</Text>
      <ImageBackground
        source={require("./assets/clear-sky-with-clouds.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View>
          <TextInput
            placeholder="Enter a city name & press return"
            onChangeText={(text) => setInput(text)}
            value={input}
            placeholderTextColor={"#000"}
            style={styles.textInput}
            onSubmitEditing={fetchDataHandler}
          />
        </View>
        {loading && (
          <View>
            <ActivityIndicator size={"large"} color="#000" />
          </View>
        )}
        {data && (
          <View style={styles.infoView}>
            <Text style={styles.cityCountryText}>
              {`${data?.name} / ${data?.sys?.country}`}
            </Text>
            <Text style={styles.dateText}>{new Date().toLocaleString()}</Text>
            <Text style={styles.tempText}>{`${Math.round(
              data?.main?.temp
            )} °C`}</Text>
            <View>
              <Image
                source={{
                  uri: `http://openweathermap.org/img/w/${data?.weather[0]?.icon}.png`,
                }}
                style={{ width: 180, height: 180 }}
              />
            </View>
            <Text style={styles.dateText}>{data?.weather[0]?.description}</Text>
            <Text style={styles.minMaxText}>{`Min ${Math.round(
              data?.main?.temp_min
            )} °C / Max ${Math.round(data?.main?.temp_max)} °C `}</Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
}

import { StyleSheet, View, Text, ScrollView, Dimensions, ImageBackground, Platform, SafeAreaView } from 'react-native';
import { Card, Button, Row, StatCard, Greetings, Input } from '@/component';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { PieChart } from 'react-native-chart-kit';

export default function Home() {

  const cardDate = (date: string) => {
    const month = new Date(date).getMonth() + 1;
    const monthFormat = month.toString().padStart(2, '0');
    const year = new Date(date).getFullYear().toLocaleString().slice(3);
    return `${monthFormat}/${year}`;
  };

  const income = 21500000

  const expenses = 2800000

  const data = [
    {
      name: "INCOME",
      population: income,
      color: "darkgreen",
      // legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "EXPENSES",
      population: expenses,
      color: "#F00",
      // legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },

  ];

  const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const firstName = "John"

  const lastName = "Doe"

  return (

    <SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <ImageBackground
          source={require("../../assets/Image/bank.png")}

        >
          <View
            style={{
              backgroundColor: "white",
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              opacity: 0.3,
              // zIndex: 1
            }}
          >
            {/* <Text>ggggggggggggggggg </Text> */}
          </View>
          <View style={styles.greet}>

            <Greetings
              name={`${firstName} ${lastName}`}
            />

          </View>

          <View style={styles.cardWrapper}>

            <Card
              amount={9876}
              cardNumber={20986753456786424589}
              date={cardDate(new Date().toString())}
            />

          </View>

          <View style={styles.container}>

            <Row title="Services">

              <View>

                <Button
                  onPress={() => console.log("Transfer")}
                  icon={
                    <FontAwesome5
                      name="exchange-alt"
                      size={32}
                    />
                  }
                />
                <Text style={styles.text}>Transfer</Text>

              </View>

              <View>

                <Button
                  onPress={() => console.log("Deposit")}
                  icon={
                    <FontAwesome5
                      name="plus"
                      size={32}
                    />
                  }
                />
                <Text style={styles.text}>Deposit</Text>

              </View>

              <View>

                <Button
                  onPress={() => console.log("Withdrawal")}
                  icon={
                    <FontAwesome5
                      name="arrow-circle-down"
                      size={32}
                    />
                  }
                />
                <Text style={styles.text}>Withdrawal</Text>

              </View>

            </Row>

            <Row title="Statistics">


              <View>

                <StatCard
                  icon={
                    <FontAwesome5
                      name="arrow-up"
                      size={32}
                    />
                  }
                  title='INCOME'
                  value={income}
                  cardColour='#004225'
                  iconColour='#50C878'
                />

              </View>

              <View>

                <StatCard
                  icon={
                    <FontAwesome5
                      name="arrow-down"
                      size={32}
                    />
                  }
                  title='EXPENSES'
                  value={expenses}
                  cardColour='#FF0000'
                  iconColour='#E44D2E'
                />

              </View>

            </Row>

            <Row
              title="Chart"
              style={styles.pie}
            >

              <PieChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[14, -20]}
                absolute={false}
                style={styles.pieChart}
              />

            </Row>

            {/* <Input
            // name='jhgg'
            /> */}

          </View>

        </ImageBackground>

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: 'green',
    // experimental_backgroundImage:,
    // paddingBottom: 60,
  },

  cardWrapper: {
    paddingHorizontal: 16,
    paddingTop: 60,
    zIndex: 2,
  },

  container: {
    marginTop: -30, // overlap the card
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    zIndex: 1,
  },

  service: {
    fontSize: 16,
    fontWeight: '600',
    // marginBottom: 10,
  },

  text: {
    fontSize: 16,
    fontWeight: 400,
    margin: 1,
    lineHeight: 30,
  },

  pie: {
    // height: 400,
  },

  pieChart: {
    // height: 400,
    justifyContent: "center",
    alignItems: "center",
  },

  greet: {
    marginLeft: 15,
    marginTop: Platform.OS === "ios" ? 60 : 40,
  },
});

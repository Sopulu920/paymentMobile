import { StyleSheet, View, Text, ScrollView, Dimensions, ImageBackground, Platform, SafeAreaView, Pressable, Modal, RefreshControl } from 'react-native';
import { Card, Button, Row, StatCard, Greetings, Input } from '@/component';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { PieChart } from 'react-native-chart-kit';
import { useState } from 'react';
import { useAppSelector } from '@/redux/hook';
import { useGetTransactionsQuery } from '@/redux/api/bankApi';
import { Transaction } from '@/redux/api/bankApi';


export default function Home() {

  const [visibleModal, setVisibleModal] = useState<"transfer" | "deposit" | "withdraw" | null>(null);
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [refreshing, setRefreshing] = useState(false);


  const { data: authData } = useAppSelector(state => state.auth)
  const { data: transactionHistory, refetch } = useGetTransactionsQuery({
    user: authData?._id
  })

  // console.log("fjkoeofkef",authData?._id)

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch(); // 👈 This is from useGetTransactionsQuery
    } catch (e) {
      console.error("Refresh failed", e);
    } finally {
      setRefreshing(false);
    }
  };


  const handleSubmit = () => {
    if (!amount) return alert("Please enter amount");
    alert(`${visibleModal?.toUpperCase()} of ₦${amount} successful`);
    setAmount("");
    setVisibleModal(null);
  };

  const cardDate = (date: string) => {
    const month = new Date(date).getMonth() + 1;
    const monthFormat = month.toString().padStart(2, '0');
    const year = new Date(date).getFullYear().toLocaleString().slice(3);
    return `${monthFormat}/${year}`;
  };

  const income = transactionHistory?.data
  ?.filter((txn: Transaction) => txn.transactionType === "credit")
  ?.reduce((sum, txn) => sum + txn.amount, 0) ?? 0;

const expenses = transactionHistory?.data
  ?.filter((txn: Transaction) => txn.transactionType === "debit")
  ?.reduce((sum, txn) => sum + txn.amount, 0) ?? 0;


  console.log("Income:", income);   // 2700000
  // console.log("Expense:", expense); // 0 (no debit transactions yet)


  // const income = 21500000

  // const expenses = 2800000

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

  console.log("toke", authData)
  console.log("tokes", transactionHistory?.data)
  // console.log("data", userEmail)
  const firstName = authData?.firstName
  const lastName = authData?.lastName
  const transactions = transactionHistory?.data || [];
  const lastTransaction = transactions[transactions.length - 1];
  const balance = lastTransaction?.newBalance ?? authData?.accountBalance
  const number = authData?.accountNumber
  const creationDate = authData?.createdAt

  return (

    <SafeAreaView>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >

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
              amount={balance}
              cardNumber={number}
              date={cardDate(creationDate ?? "")}
            />

          </View>

          <View style={styles.container}>

            <Row title="Services">

              <View>

                <Button
                  onPress={() => setVisibleModal("transfer")}
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
                  onPress={() => setVisibleModal("deposit")}
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
                  onPress={() => setVisibleModal("withdraw")}
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

      <Modal
        visible={visibleModal !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setVisibleModal(null)}
      >

        <View style={modalStyles.overlay}>

          <View style={modalStyles.modalView}>

            <Text style={modalStyles.modalTitle}>
              {visibleModal?.toUpperCase()}
            </Text>

            <View style={modalStyles.formContainer}>

              {visibleModal === "transfer" && (
                <Input
                  name='Enter account number'
                  placeholder="Enter account number"
                  keyboardType="numeric"
                  value={accountNumber}
                  onChangeText={setAccountNumber}
                // style={modalStyles.input}
                />
              )}

              <Input
                name='Enter amount'
                placeholder="Enter amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              // style={modalStyles.input}
              />

              <View style={modalStyles.btn}>

                <Pressable style={modalStyles.submitButton} onPress={handleSubmit}>
                  <Text style={modalStyles.submitText}>Submit</Text>
                </Pressable>

                <Pressable onPress={() => setVisibleModal(null)}>
                  <Text style={modalStyles.cancelText}>Cancel</Text>
                </Pressable>

              </View>

            </View>

          </View>

        </View>

      </Modal>


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

const modalStyles = StyleSheet.create({

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalView: {
    width: 300,
    padding: 25,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 10,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  // input: {
  //   width: "100%",
  //   borderColor: "#ccc",
  //   borderWidth: 1,
  //   padding: 10,
  //   borderRadius: 5,
  //   marginBottom: 20,
  //   fontSize: 16,
  // },

  formContainer: {
    width: "100%",
    gap: 30,
    paddingHorizontal: 7,
  },

  btn: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  submitButton: {
    backgroundColor: "#008080",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
  },

  submitText: {
    color: "#fff",
    fontWeight: "bold",
  },

  cancelText: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
  },
});

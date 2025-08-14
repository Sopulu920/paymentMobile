import { StyleSheet, View, Text, ScrollView, Dimensions, ImageBackground, Platform, Pressable, Modal, RefreshControl, ActivityIndicator } from 'react-native';
import { Card, Button, Row, Greetings, Input, ProfileImage } from '@/component';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { PieChart } from 'react-native-chart-kit';
import { useState } from 'react';
import { useAppSelector } from '@/redux/hook';
import { useGetTransactionsQuery, Transaction, useDepositMutation, useWithdrawMutation, useTransferMutation, useVerifyTransferMutation } from '@/redux/api/bankApi';


export default function Home() {

  const [visibleModal, setVisibleModal] = useState<"transfer" | "deposit" | "withdraw" | null>(null);
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState<string | undefined>("");
  const [refreshing, setRefreshing] = useState(false);
  const [verifiedAccount, setVerifiedAccount] = useState(false)


  const { data: authData } = useAppSelector(state => state.auth)
  const { data: transactionHistory, refetch } = useGetTransactionsQuery({
    user: authData?._id,
    // limit: 50
  })
  const [deposit, { isLoading: depositLoading }] = useDepositMutation()
  const [withdraw, { isLoading: withdrawLoading }] = useWithdrawMutation()
  const [transfer, { isLoading: transferLoading }] = useTransferMutation()
  const [postAccountNumber, { data: accountHolderName }] = useVerifyTransferMutation()

  const handleTransfer = async (text: string) => {
    setAccountNumber(text);

    if (text.length === 10) {
      try {
        await postAccountNumber({
          accountNumber: Number(text)
        }).unwrap();

        setVerifiedAccount(true)

      } catch (err) {
        console.log("Account verification failed:", err);
        setAccountHolder("Invaild Account Number");
        setVerifiedAccount(false)
      }
    } else {
      setAccountHolder(undefined); // clear if not valid
    }
  };

  setTimeout(() => {
    if (accountHolderName?.data?.accountName !== undefined && verifiedAccount === true && accountNumber.length === 10) {
      setAccountHolder(accountHolderName?.data?.accountName)
    }
  }, 30);

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


  const handleSubmit = async () => {
    if (!amount || !accountNumber || accountNumber.length !== 10) return alert("Please enter vaild amount or account number");

    try {
      if (visibleModal === "deposit") {

        await deposit({

          userId: authData?._id ?? "",
          amount: Number(amount)

        }).unwrap()
      }

      if (visibleModal === "withdraw") {

        await withdraw({

          userId: authData?._id ?? "",
          amount: Number(amount)

        }).unwrap()
      }

      if (visibleModal === "transfer") {

        await transfer({

          senderId: authData?._id ?? "",
          receiverAccountNumber: Number(accountNumber),
          amount: Number(amount)

        }).unwrap()
      }

    } catch (err) {
      console.log(err)
    } finally {
      await refetch()
      setVisibleModal(null);
      alert(`${visibleModal?.toUpperCase()} of ₦${amount} successful`);
      setAmount("");
    }

  };

  const cardDate = (date: string) => {
    const month = new Date(date).getMonth() + 1;
    const monthFormat = month.toString().padStart(2, '0');
    const year = new Date(date).getFullYear().toLocaleString().slice(3);
    return `${monthFormat}/${year}`;
  };

  function formatNumber(amount: number | string): string {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (isNaN(num)) {
      throw new Error('Invalid number input');
    }

    return new Intl.NumberFormat(undefined, {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  }

  const incomes = transactionHistory?.data
    ?.filter((txn: Transaction) => txn.transactionType === "credit")
    ?.reduce((sum, txn) => sum + txn.amount, 0) ?? 0;

  const expense = transactionHistory?.data
    ?.filter((txn: Transaction) => txn.transactionType === "debit")
    ?.reduce((sum, txn) => sum + txn.amount, 0) ?? 0;

  const data = [
    {
      name: "INCOME",
      population: incomes,
      color: "#61E838",
      // legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "EXPENSES",
      population: expense,
      color: "#F01601",
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
  const lastTransaction = transactions[0];
  const balance = formatNumber(lastTransaction?.newBalance ?? 0)
  const number = authData?.accountNumber
  const creationDate = authData?.createdAt
  // const receiver = accountHolderName
  console.log("kliofeifjie", accountHolder)

  if (refreshing === true) {
    return (
      <SafeAreaView
        style={
          {
            height: screenHeight,
            justifyContent: "center",
            alignItems: 'center'
          }
        }
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    )
  }

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

          <View style={styles.greetWrapper}>

            <ProfileImage
              firstName={`${firstName}`}
              lastName={`${lastName}`}
              size={70}
            />

            <View style={styles.greet}>

              <Greetings
                name={`${firstName} ${lastName}`}
              />

            </View>

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

              <View style={styles.transaction}>

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

              <View style={styles.transaction}>

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

              <View style={styles.transaction}>

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
                <View>
                  {/* <Text>Receiver</Text> */}
                  <Text style={modalStyles.benefiaciary}>{accountHolder}</Text>

                  <Input
                    // name='Enter account number'
                    placeholder="Enter 10 Digit Account Number"
                    keyboardType="numeric"
                    value={accountNumber}
                    onChangeText={handleTransfer}
                  // style={modalStyles.input}
                  />
                </View>
              )}

              <Input
                // name='Enter amount'
                placeholder="Enter amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              // style={modalStyles.input}
              />

              <View style={modalStyles.btn}>

                <Pressable
                  style={modalStyles.submitButton}
                  onPress={handleSubmit}
                  disabled={transferLoading || depositLoading || withdrawLoading}
                >

                  {
                    transferLoading || depositLoading || withdrawLoading ?
                      (<ActivityIndicator size="large" color="#0000ff" />) :
                      (<Text style={modalStyles.submitText}>Submit</Text>)
                  }

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
    paddingBottom: 50,
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

  greetWrapper: {
    flexDirection: "row",
    gap: 15,
    marginLeft: 15,
    marginTop: Platform.OS === "ios" ? 60 : 40,
    // justifyContent: "center",
    alignItems: "center",
  },

  greet: {

  },

  transaction: {
    justifyContent: "center",
    alignItems: "center",
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
    gap: 10,
    paddingHorizontal: 7,
  },

  btn: {
    // flexDirection: "row",
    // justifyContent: "space-between",
  },

  submitButton: {
    backgroundColor: "#61E838",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 10,
  },

  submitText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },

  cancelText: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },

  benefiaciary: {
    marginHorizontal: 15,
    // width: "",
    // textAlign: "center",
    lineHeight: 30,
    fontSize: 16,
    opacity: 0.6,
    // alignItems:"center",
  }
});

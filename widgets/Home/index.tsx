import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Card } from '@/component/Card';

export default function Home() {
  const cardDate = (date: string) => {
    const month = new Date(date).getMonth() + 1;
    const monthFormat = month.toString().padStart(2, '0');
    const year = new Date(date).getFullYear().toLocaleString().slice(3);
    return `${monthFormat}/${year}`;
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>

      <View style={styles.cardWrapper}>

        <Card
          amount={9876}
          cardNumber={20986753456786424589}
          date={cardDate(new Date().toString())}
        />

      </View>

      <View style={styles.container}>

        <Text style={styles.service}>Services</Text>
        
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: 'green',
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
});

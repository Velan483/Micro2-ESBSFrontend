// PaymentDocument.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../../assets/logo.png'; // Import the logo image

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica',
    backgroundColor: '#f7f7f7',
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 20,
    alignSelf: 'center',
  },
  container: {
    margin: 20,
    padding: 15,
    border: '1px solid #ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  sectionHeader: {
    backgroundColor: '#e0f7fa',
    padding: 5,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 14,
    width: '40%',
  },
  value: {
    color: '#555',
    fontSize: 14,
    width: '60%',
    textAlign: 'right',
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 12,
    color: '#888',
  },
});

const PaymentDocument = ({ paymentData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image style={styles.logo} src={logo} />
      <View style={styles.container}>
        <Text style={styles.title}>Payment Receipt</Text>

        <View style={styles.sectionHeader}>
          <Text>Booking Details</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Event Name:</Text>
          <Text style={styles.value}>{paymentData.booking.eventName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{paymentData.booking.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Booked Stalls:</Text>
          <Text style={styles.value}>{paymentData.booking.numberOfStalls}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Amount Paid:</Text>
          <Text style={styles.value}>{paymentData.booking.amount}</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text>Payment Details</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Payment Method:</Text>
          <Text style={styles.value}>{paymentData.paymentMethod}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Payment Date:</Text>
          <Text style={styles.value}>{new Date(paymentData.paymentDate).toLocaleDateString()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Transaction ID:</Text>
          <Text style={styles.value}>{paymentData.transactionId}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Payment Status:</Text>
          <Text style={styles.value}>{paymentData.status}</Text>
        </View>
      </View>
      <Text style={styles.footer}>
        Thank you for your payment. If you have any questions, please contact our support team.
      </Text>
    </Page>
  </Document>
);

export default PaymentDocument;

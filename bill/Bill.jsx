import { StyleSheet, Text, View } from '@react-pdf/renderer'

// PDF belgesi için stilleri tanımlayın
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFF',
    padding: 24,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: 14,
    marginBottom: 2,
  },
  lineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingBottom: 4,
    marginBottom: 4,
  },
  lineItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F0F0F0',
    padding: 4,
  },
  footer: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 12,
  },

  border: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    margin: 10,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '33%',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCol: {
    width: '33%',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCell: {
    margin: 'auto',
    fontSize: 10,
  },
})

function MyDocument({ data }) {
  console.log(data);
  return (
    <View style={{ ...styles.section, ...styles.border, ...styles.text }}>
      <Text style={styles.title}>Fatura</Text>

      {/* Fatura Bilgileri */}
      <Text style={styles.header}>Fatura Bilgileri:</Text>
      <Text style={styles.detailText}>Tam Adı: {data?.customerFullName}</Text>
      <Text style={styles.detailText}>TC: {data?.billingTc}</Text>
      <Text style={styles.detailText}>Adres: {data?.billingAddress}</Text>
      <Text style={styles.detailText}>Şehir: {data?.billingCity}</Text>
      <Text style={styles.detailText}>Ülke: {data?.billingCountry}</Text>
      <Text style={styles.detailText}>İlçe: {data?.billingDistrict}</Text>

      {/* Sipariş Bilgileri */}
      <Text style={styles.header}>Sipariş Bilgileri:</Text>
      <View style={styles.table}>
        {/* Tablo Başlığı */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}><Text>Tarih</Text></View>
          <View style={styles.tableColHeader}><Text>Sipariş ID</Text></View>
          <View style={styles.tableColHeader}><Text>Durum</Text></View>
        </View>

        {/* Tablo Satırları */}
        <View style={styles.tableRow}>
          <View style={styles.tableCol}><Text style={styles.tableCell}>{data.orderDate.toISOString().slice(0, 10)}</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>{data?.orderId}</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>{data?.status}</Text></View>
        </View>
        {/* Daha fazla satır eklenebilir */}
      </View>

      {/* Alt Bilgi */}
      <Text style={styles.footer}>Bizi tercih ettiğiniz için teşekkür ederiz!</Text>
    </View>
  )
}

export default MyDocument
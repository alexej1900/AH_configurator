import { Page, Text, Image, Svg, View, Document, StyleSheet } from '@react-pdf/renderer';
// import { PDFExport, savePDF } from '@progress/kendo-react-pdf';

// import { useSelector } from 'react-redux';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    width: '210mm',
    height: '297mm',
    background: 'white',
    padding: '32px',
    // padding: 20,
    // backgroundColor: '#E4E4E4'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  logoName: {
    width: 80,
    height: 30,
  },
  logo: {
    width: 126,
    height: 104,
  },
  isomwtry: {
    width: 300,
    height: 300
  }
});

// Create Document Component
export default function PdfPage ({image}) {
  // const { apartStyle } = useSelector(state => state);
  // const html = renderToStaticMarkup(component);
  console.log('image', image)
  // const pdfExportComponent = React.useRef(null);
  // width={`${apartSize.image.width}`} height={`${apartSize.image.height}`}

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            src={'./AHLogo.svg'}
          />
        </View>
        
        <View style={styles.section}>
          <Text>Ihre Wohnung</Text>

          <View style={styles.sectionIsometry}>
            <Image
              style={styles.isometry}
              source={ `uri: ${image}, method: 'GET', headers: {'Access-Control-Allow-Origin': http://localhost:3000/} `}
            />

          
          </View>
        </View>
        <Text render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>

      {/* <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
        <Text render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page> */}
    </Document>
  )
};

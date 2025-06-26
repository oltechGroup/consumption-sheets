import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import logo from "../../assets/images/logo-name.png";
import footer from "../../assets/images/footer-2.jpg";
import lateral from "../../assets/images/franja-lateral.png";
import footer2 from "../../assets/images/footer.jpg";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 16,
    paddingTop: 80,
    fontSize: 11,
    paddingRight: 46,
    position: "relative",
  },
  page2: {
    padding: 16,
    paddingTop: 80,
    fontSize: 10,
    fontWeight: "extralight",
    paddingRight: 46,
    position: "relative",
  },
  footer: {
    position: "absolute",
    bottom: 10,
    left: 16,
    right: 16,
    width: 250,
  },
  logo: {
    position: "absolute",
    top: 10,
    left: 16,
    width: 180,
  },
  lateral: {
    position: "absolute",
    width: 30,
    height: "100vh",
    right: 0,
  },

  containerFolio: {
    position: "absolute",
    right: 50,
    top: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 5,
  },

  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "10%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
  },
  tableColSubtotal: {
    width: "15%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
  },
  tableColDescription: {
    width: "55%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
  },
  tableCell: {
    margin: 5,
    fontSize: 8,
  },
  // Firma
  sectionFirma: {
    width: "80%",
    marginHorizontal: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    marginTop: 60,
  },
  sectionFirmaItem: {
    width: "50%",
    fontSize: 10,
    textAlign: "center",
    borderStyle: "solid",
    borderTopWidth: 1,
    borderTopColor: "#000",
    padding: 8,
  },
  qrCode: {
    width: 100,
    height: 100,
    marginHorizontal: "auto",
  },

  // Encuesta de satisfacción
  datosEncuesta: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    marginBottom: 10,
  },
  question: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    marginTop: 10,
    fontWeight: "bold",
  },
  answers: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },

  oneQuestion: {
    marginTop: 10,
    paddingBottom: 20,
    borderBottom: 1,
    borderBottomColor: "#000",
  },

  numeroPagina: {
    position: "absolute",
    bottom: 20,
    right: 50,
  },
});

const formatMoney = (number, currency = "$") => {
  // Verifica si el número es válido
  if (isNaN(number)) {
    return "Invalid number";
  }

  // Convierte el número a un string con dos decimales
  let formattedNumber = number.toFixed(2);

  // Divide el número en partes enteras y decimales
  let parts = formattedNumber.split(".");

  // Agrega comas como separadores de miles a la parte entera
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Une las partes enteras y decimales
  formattedNumber = parts.join(".");

  // Agrega el símbolo de moneda al principio y devuelve el resultado
  return currency + formattedNumber;
};

const ConsumoPDF = ({ info, partidas }) => {
  return (
    <Document>
      <Page style={styles.page} size={"A4"}>
        <View style={styles.containerFolio}>
          <Text>HGMGG-DA-SRM-CAAS137-2025</Text>
          <Text>MPM-01-R04</Text>
          <Text>Versión 3</Text>
          <Text>
            Folio: OLT{info.date.split("-")[2]}
            {info.date.split("-")[1]}
            {info.date.split("-")[0]}-{info.folio}
          </Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            INFORMACIÓN
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            <Text>Hospital: {info.hospital}</Text>
            <Text>Fecha de CX: {info.date}</Text>
            <Text>Doctor: {info.doctor}</Text>
            <Text>
              Técnicos: {info.instrumentalist} / {info.support}
            </Text>
            <Text>Paciente: {info.patient}</Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            CONSUMO
          </Text>
        </View>
        <View style={styles.table}>
          {/* Fila de encabezado */}
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Código</Text>
            </View>
            <View style={styles.tableColDescription}>
              <Text style={styles.tableCell}>Descripción</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Qty</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>P.U</Text>
            </View>
            <View style={styles.tableColSubtotal}>
              <Text style={styles.tableCell}>Subtotal</Text>
            </View>
          </View>
          {/* Fila de datos */}
          {partidas.map((partida, index) => (
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{partida.code}</Text>
              </View>
              <View style={styles.tableColDescription}>
                <Text style={styles.tableCell}>{partida.description}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{partida.quantity}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {formatMoney(partida.price)}
                </Text>
              </View>
              <View style={styles.tableColSubtotal}>
                <Text style={styles.tableCell}>
                  {formatMoney(partida.quantity * partida.price)}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableColDescription}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Total</Text>
            </View>
            <View style={styles.tableColSubtotal}>
              <Text style={styles.tableCell}>
                {formatMoney(
                  partidas.reduce(
                    (acc, partida) => acc + partida.quantity * partida.price,
                    0
                  )
                )}
              </Text>
            </View>
          </View>
        </View>
        
          
       
        <View>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            NOTAS:
          </Text>
        </View>
        <View
          style={{ borderTop: 1, borderBottom: 1, height: 20, marginTop: 10 }}
        ></View>
        <View style={styles.sectionFirma}>
          <View style={styles.sectionFirmaItem}>
            <Text>Dra. Ana Cristina King Martínez</Text>
            <Text style={{ marginTop: 5 }}>
              Jefa de Departamento de Ortopedia
            </Text>
          </View>
        </View>

        <Text style={styles.numeroPagina}>Pág. 2/2</Text>
{/* Images layout */}
        {/* Images layout */}
        

        {/* Images layout */}
        <Image src={logo} style={styles.logo} />
        <Image src={footer2} style={styles.footer} />
        <Image src={lateral} style={styles.lateral} />
      </Page>
    </Document>
  );
};

export default ConsumoPDF;

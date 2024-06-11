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
import footer from "../../assets/images/footer.png";
import lateral from "../../assets/images/franja-lateral.png";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 16,
    paddingTop: 80,
    fontSize: 12,
    paddingRight: 46,
    position: "relative",
  },
  footer: {
    position: "absolute",
    bottom: 10,
    left: 16,
    right: 16,
    width: 300,
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
    gap: 16,
    marginTop: 60,
  },
  sectionFirmaItem: {
    width: "50%",
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
});

const formatMoney = (amount) => {
  return `$${amount.toFixed(2)}`;
};

const ConsumoPDF = ({ info, partidas }) => {
  return (
    <Document>
      <Page style={styles.page} size={"A4"}>
        <View style={styles.containerFolio}>
          <Text>
            FOLIO: OLT{info.date.split("-")[2]}
            {info.date.split("-")[1]}
            {info.date.split("-")[0]}-{info.folio}
          </Text>
          <Text>
            {info.date.split("-")[2]}/{info.date.split("-")[1]}/
            {info.date.split("-")[0]}
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
            <Text>HOSPITAL: {info.hospital}</Text>
            <Text>FECHA DE CX: {info.date}</Text>
            <Text>DOCTOR: {info.doctor}</Text>
            <Text>
              TÉCNICOS: {info.instrumentalist} / {info.support}{" "}
            </Text>
            <Text>PACIENTE: {info.patient}</Text>
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
            <Text>{info.doctor}</Text>
          </View>

          <View style={styles.sectionFirmaItem}>
            <Text>Dra. Ana Cristina King Martínez</Text>
          </View>
        </View>

        {/* Images layout */}
        <Image src={logo} style={styles.logo} />
        <Image src={footer} style={styles.footer} />
        <Image src={lateral} style={styles.lateral} />
      </Page>
    </Document>
  );
};

export default ConsumoPDF;

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
          <Text>HGMGG/DA/SRM/LPI116/2024</Text>
          <Text>Código: NPM-01-R04</Text>
          <Text>Versión 1.2</Text>
          <Text>
            Folio: OLT{info.date.split("-")[2]}
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
            <Text>Hospital: {info.hospital}</Text>
            <Text>Fecha de CX: {info.date}</Text>
            <Text>Doctor: {info.doctor}</Text>
            <Text>
              Técnicos: {info.instrumentalist} / {info.support}
            </Text>
            <Text>Paciente: {info.patient}</Text>
            <Text>
              Hora Inicio {info.horaInicio} - Hora Término {info.horaTermino}
            </Text>
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
                  {/* {formatMoney(partida.price)} */}
                </Text>
              </View>
              <View style={styles.tableColSubtotal}>
                <Text style={styles.tableCell}>
                  {/* {formatMoney(partida.quantity * partida.price)} */}
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
              {/* <Text style={styles.tableCell}>
                {formatMoney(
                  partidas.reduce(
                    (acc, partida) => acc + partida.quantity * partida.price,
                    0
                  )
                )}
              </Text> */}
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
            <Text style={{ marginTop: 5 }}>Médico Adscrito</Text>
          </View>

          <View style={styles.sectionFirmaItem}>
            <Text>Dra. Ana Cristina King Martínez</Text>
            <Text style={{ marginTop: 5 }}>
              Jefa de Departamento de Ortopedia
            </Text>
          </View>
        </View>

        <Text style={styles.numeroPagina}>Pag. 1 / 2</Text>

        {/* Images layout */}
        <Image src={logo} style={styles.logo} />
        <Image src={footer2} style={styles.footer} />
        <Image src={lateral} style={styles.lateral} />
      </Page>

      {/* Encuesta de satisfaccion */}
      <Page style={styles.page2} size={"A4"}>
        <View style={styles.containerFolio}>
          <Text>HGMGG/DA/SRM/LPI116/2024</Text>
          <Text>Código: NPM-01-R04</Text>
          <Text>Versión 1.1</Text>
          <Text>
            Folio: OLT{info.date.split("-")[2]}
            {info.date.split("-")[1]}
            {info.date.split("-")[0]}-{info.folio}
          </Text>
          <Text>
            {info.date.split("-")[2]}/{info.date.split("-")[1]}/
            {info.date.split("-")[0]}
          </Text>
        </View>

        <Text
          style={{
            fontSize: 16,
            marginBottom: 10,
          }}
        >
          Encuesta de satisfacción
        </Text>

        <View style={styles.datosEncuesta}>
          <Text>Nombre del médico: {info.doctor}</Text>
          <Text>Nombre del instrumentista: {info.instrumentalist}</Text>
          <Text>Nombre del paciente: {info.patient}</Text>
        </View>

        <View style={styles.question}>
          <View style={styles.answers}>
            <Text>1 - Tipo de procedimiento quirúrgico:</Text>
            <Text>Prótesis</Text>
            <Text>/</Text>
            <Text>Osteosíntesis</Text>
            <Text>/</Text>
            <Text>Artroscopias</Text>
          </View>
        </View>

        <View style={styles.question}>
          <View style={styles.answers}>
            <Text>
              2 - ¿Recibió los dispositivos Médicos que solicitó correctamente,
              y en buen estado?:
            </Text>
            <Text>Si</Text>
            <Text>/</Text>
            <Text>No</Text>
          </View>
        </View>

        <View style={styles.question}>
          <View style={styles.answers}>
            <Text>
              3 - Para el Set de Implantes, ¿este se encontraba completo según
              lo solicitado?:
            </Text>
            <Text>Si</Text>
            <Text>/</Text>
            <Text>No</Text>
          </View>
        </View>

        <View style={styles.question}>
          <View style={styles.answers}>
            <Text>
              4 - Para el Equipo Instrumental, ¿se recibió el equipo solicitado
              y en buen estado?:
            </Text>
            <Text>Si</Text>
            <Text>/</Text>
            <Text>No</Text>
          </View>
        </View>

        <View style={styles.question}>
          <View style={styles.answers}>
            <Text>
              5 - Para el Equipo Instrumental, ¿este se encontraba en
              condiciones para atender la cirugía?:
            </Text>
            <Text>Si</Text>
            <Text>/</Text>
            <Text>No</Text>
          </View>
        </View>

        <View style={styles.question}>
          <View style={styles.answers}>
            <Text>
              6 - Para el Equipo de Artroscopia, ¿este se encontraba completo
              según lo solicitado?:
            </Text>
            <Text>Si</Text>
            <Text>/</Text>
            <Text>No</Text>
          </View>
        </View>

        <Text style={styles.oneQuestion}>
          7 - En caso de tener algún comentario adicional acerca del equipo
          ofrecido para el procedimiento solicitado, favor de mencionarlo:
        </Text>

        <View style={styles.question}>
          <Text>
            8 - Para la Asistencia Técnica, favor de indicar la opción que más
            se acerque a su opinión:
          </Text>

          <View style={{ marginLeft: 20, gap: 5 }}>
            <View style={styles.answers}>
              <Text>8.1 - Puntualidad: </Text>
              <Text>Excelente</Text>
              <Text>/</Text>
              <Text>Bueno</Text>
              <Text>/</Text>
              <Text>Regular</Text>
              <Text>/</Text>
              <Text>Malo</Text>
            </View>

            <View style={styles.answers}>
              <Text>8.2 - Proactividad: </Text>
              <Text>Excelente</Text>
              <Text>/</Text>
              <Text>Bueno</Text>
              <Text>/</Text>
              <Text>Regular</Text>
              <Text>/</Text>
              <Text>Malo</Text>
            </View>

            <View style={styles.answers}>
              <Text>8.3 - Acompañamiento: </Text>
              <Text>Excelente</Text>
              <Text>/</Text>
              <Text>Bueno</Text>
              <Text>/</Text>
              <Text>Regular</Text>
              <Text>/</Text>
              <Text>Malo</Text>
            </View>

            <View style={styles.answers}>
              <Text>8.4 - Conocimiento: </Text>
              <Text>Excelente</Text>
              <Text>/</Text>
              <Text>Bueno</Text>
              <Text>/</Text>
              <Text>Regular</Text>
              <Text>/</Text>
              <Text>Malo</Text>
            </View>

            <View style={styles.answers}>
              <Text>8.5 - Asesoría: </Text>
              <Text>Excelente</Text>
              <Text>/</Text>
              <Text>Bueno</Text>
              <Text>/</Text>
              <Text>Regular</Text>
              <Text>/</Text>
              <Text>Malo</Text>
            </View>

            <View style={styles.answers}>
              <Text>8.6 - Cumplimiento de lineamientos: </Text>
              <Text>Excelente</Text>
              <Text>/</Text>
              <Text>Bueno</Text>
              <Text>/</Text>
              <Text>Regular</Text>
              <Text>/</Text>
              <Text>Malo</Text>
            </View>

            <View style={styles.answers}>
              <Text>8.7 - Desempeño: </Text>
              <Text>Excelente</Text>
              <Text>/</Text>
              <Text>Bueno</Text>
              <Text>/</Text>
              <Text>Regular</Text>
              <Text>/</Text>
              <Text>Malo</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            marginTop: 10,
          }}
        >
          <Text style={styles.oneQuestion}>
            9 - ¿Considera que el apoyo que se brinda por parte del personal de
            OLTECH es apropiado?
          </Text>
          <Text style={styles.oneQuestion}>
            10 - ¿Considera que el tiempo de atención asignado a su solicitud de
            servicio fue el adecuado?
          </Text>
          <Text style={styles.oneQuestion}>
            11 - ¿Considera que el servicio brindado por la organización OLTECH
            cumple sus expectativas?
          </Text>
          <Text style={styles.oneQuestion}>
            En caso de tener algún comentario adicional sobre la Asistencia
            Técnica ofrecida, favor de mencionarlo:
          </Text>
        </View>

        <Text style={styles.numeroPagina}>Pag. 2 / 2</Text>

        {/* Images layout */}
        <Image src={logo} style={styles.logo} />
        <Image src={footer2} style={styles.footer} />
        <Image src={lateral} style={styles.lateral} />
      </Page>
    </Document>
  );
};

export default ConsumoPDF;

import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./Index.module.css";
import {
  Autocomplete,
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import { Pencil, Trash } from "@phosphor-icons/react";
import { doctors, hospitals, instrumentalists, supports } from "../data/inputs";
import ConsumoPDF from "./pdf/ConsumoPDF";
import { pdf } from "@react-pdf/renderer";
import ModalUpdate from "./common/ModalUpdate";
import { usePartidas } from "../context/PartidasProvides";
import { partidasAdjudicadas } from "../data/partidas";
import ModalAdd from "./common/ModalAdd";

const printPDF = async (info, partidas) => {
  const blob = await pdf(
    <ConsumoPDF info={info} partidas={partidas} />
  ).toBlob();
  const url = URL.createObjectURL(blob);
  const printWindow = window.open(url);
  printWindow.addEventListener("load", function () {
    printWindow.print();
  });
};

function Index() {
  const {
    partidas,
    addPartida,
    deletePartida,
    updatePartida,
    deleteAllPartidas,
  } = usePartidas();

  const [dataConsumo, setDataConsumo] = useState({
    patient: "",
    hospital: "",
    doctor: "",
    folio: 0,
    date: "",
  });

  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    setDataConsumo({
      ...dataConsumo,
      [name]: value,
    });
  };

  const [selectedPartida, setSelectedPartida] = useState({
    partida: {},
    quantity: 0,
    notes: "",
  });

  // Multiple Select States
  const [instrumentalistName, setInstrumentalistName] = useState([]);
  const [supportName, setSupportName] = useState([]);

  const handleChangeInstrumentalist = (event) => {
    const {
      target: { value },
    } = event;
    setInstrumentalistName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeSupport = (event) => {
    const {
      target: { value },
    } = event;
    setSupportName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  // End Multiple Select States

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  // Modal States
  const [open, setOpen] = useState(false);
  const [selectedPartidaUpdate, setSelectedPartidaUpdate] = useState({
    id: '',
    code: '',
    description: '',
    quantity: 0,
    price: 0,
    subtotal: 0,
  });

  const handleOpen = (partida) => {
    setOpen(true);
    setSelectedPartidaUpdate(partida);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openAdd, setOpenAdd] = useState(false);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };
  
  return (
    <>
      <ModalUpdate open={open} handleClose={handleClose} partida={selectedPartidaUpdate} />
      <ModalAdd open={openAdd} handleClose={handleCloseAdd} />
      <div className={styles.container}>
        <section className={styles.form}>
          <div className={styles.titleLogo}>
            <img src={logo} alt="Oltech" />
            <h1>Hoja de Consumo</h1>
          </div>

          <h2 style={{ marginBottom: 5 }}>Información</h2>
          <div className={styles.sectionForm}>
            <div className={styles.formGroup}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Paciente"
                variant="outlined"
                value={dataConsumo.patient}
                name="patient"
                onChange={handleChange}
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="Folio"
                variant="outlined"
                type="number"
                value={dataConsumo.folio}
                name="folio"
                onChange={handleChange}
              />
            </div>
            <FormControl fullWidth>
              <InputLabel id="hospital">Hospital</InputLabel>
              <Select
                labelId="hospital"
                id="demo-simple-select"
                label="Hospital"
                value={dataConsumo.hospital}
                name="hospital"
                onChange={handleChange}
              >
                {hospitals.map((hospital) => (
                  <MenuItem key={hospital.id} value={hospital.name}>
                    {hospital.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div className={styles.formGroup}>
              <FormControl fullWidth>
                <InputLabel id="doctor">Doctor</InputLabel>
                <Select
                  labelId="doctor"
                  id="doctor"
                  label="doctor"
                  value={dataConsumo.doctor}
                  name="doctor"
                  onChange={handleChange}
                >
                  {doctors.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.name}>
                      {doctor.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <input
                id="outlined-basic"
                label="Fecha"
                variant="outlined"
                type="date"
                value={dataConsumo.date}
                name="date"
                style={{ padding: 10, fontFamily: "inherit", borderRadius: 5, border: '1px solid #ccc' }}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <FormControl fullWidth>
                <InputLabel id="instrumentalist">Instrumentista</InputLabel>
                <Select
                  labelId="instrumentalist"
                  id="instrumentalist"
                  label="instrumentalist"
                  multiple
                  value={instrumentalistName}
                  onChange={handleChangeInstrumentalist}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {instrumentalists.map((instrumentalist) => (
                    <MenuItem
                      key={instrumentalist.name}
                      value={instrumentalist.name}
                    >
                      <Checkbox
                        checked={
                          instrumentalistName.indexOf(instrumentalist.name) > -1
                        }
                      />
                      <ListItemText primary={instrumentalist.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="supports">Apoyos</InputLabel>
                <Select
                  labelId="supports"
                  id="supports"
                  multiple
                  value={supportName}
                  onChange={handleChangeSupport}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {supports.map((support) => (
                    <MenuItem key={support.name} value={support.name}>
                      <Checkbox
                        checked={supportName.indexOf(support.name) > -1}
                      />
                      <ListItemText primary={support.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </section>

        <section className={styles.containerForm}>
          <div className={styles.buttonsForm}>
            <Button
              variant="outlined"
              color="error"
              onClick={deleteAllPartidas}
            >
              Borrar Partidas
            </Button>
            <Button variant="outlined" color="success" onClick={handleOpenAdd}>
              Agregar Partida
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                printPDF(
                  {
                    ...dataConsumo,
                    support: supportName.join(", "),
                    instrumentalist: instrumentalistName.join(", "),
                  },
                  partidas
                );
              }}
            >
              Imprimir Hoja
            </Button>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Partida</TableCell>
                  <TableCell>Código</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Precio</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {partidas.map((partida, index) => (
                  <TableRow
                    key={index + 1}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{partida.code}</TableCell>
                    <TableCell style={{ fontSize: 12 }}>
                      {partida.description}
                    </TableCell>
                    <TableCell>{partida.quantity}</TableCell>
                    <TableCell>{partida.price}</TableCell>
                    <TableCell className={styles.buttonActions}>
                      <IconButton
                        aria-label="delete"
                        onClick={() => deletePartida(partida.id)}
                      >
                        <Trash size={25} weight="fill" />
                      </IconButton>

                      <IconButton aria-label="edit" onClick={() => handleOpen(partida)}>
                        <Pencil size={25} weight="fill" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {partidas.length === 0 && (
            <h3 style={{ textAlign: "center", marginTop: 50 }}>
              No hay partidas registradas
            </h3>
          )}
        </section>
      </div>
    </>
  );
}

export default Index;

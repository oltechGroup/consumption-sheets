import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import styles from "../Index.module.css";
import { Autocomplete, Fab, TextField } from "@mui/material";
import { partidasAdjudicadas } from "../../data/partidas";
import { usePartidas } from "../../context/PartidasProvides";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

function ModalAdd({ open, handleClose }) {
  const { addPartida } = usePartidas();

  const [selectedPartida, setSelectedPartida] = useState({
    partida: {},
    quantity: 0,
    notes: "",
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Agregar
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
          Ingrese la partida y la cantidad que desea agregar.
        </Typography>
        <div className={styles.sectionForm}>
          <Autocomplete
            fullWidth
            disablePortal
            getOptionLabel={(option) => option.description}
            options={partidasAdjudicadas}
            renderInput={(params) => <TextField {...params} label="Partida" />}
            onChange={(event, value) => {
              setSelectedPartida({
                partida: value,
                quantity: 1,
              });
            }}
          />
          <label htmlFor="cantidad">Cantidad</label>
          <div className={styles.inputNumber}>
            <button
              onClick={() => {
                setSelectedPartida({
                  ...selectedPartida,
                  quantity: selectedPartida.quantity - 1,
                });
              }}
            >
              <RemoveIcon />
            </button>
            <input
              type="number"
              id="cantidad"
              value={selectedPartida.quantity}
              onChange={(event) => {
                setSelectedPartida({
                  ...selectedPartida,
                  quantity: event.target.value,
                });
              }}
            />
            <button
              onClick={() => {
                setSelectedPartida({
                  ...selectedPartida,
                  quantity: selectedPartida.quantity + 1,
                });
              }}
            >
              <AddIcon />
            </button>
          </div>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Notas (Opcional)"
            variant="outlined"
            name="notes"
            value={selectedPartida.notes}
            onChange={(event) => {
              setSelectedPartida({
                ...selectedPartida,
                notes: event.target.value,
              });
            }}
            multiline
            rows={3}
          />
          <Button
            variant="outlined"
            className={styles.buttonForm}
            onClick={() => {
              addPartida(
                { ...selectedPartida.partida, notes: selectedPartida.notes },
                selectedPartida.quantity
              );
              setSelectedPartida({
                partida: {},
                quantity: 0,
                notes: "",
              });
              handleClose();
            }}
          >
            Insertar
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default ModalAdd;

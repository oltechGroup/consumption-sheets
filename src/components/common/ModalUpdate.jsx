import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import styles from "../Index.module.css";
import { TextField } from "@mui/material";
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

function ModalUpdate({ open, handleClose, partida }) {
  const { updatePartida } = usePartidas();

  const [selectedPartida, setSelectedPartida] = useState({
    id: '',
    code: '',
    description: '',
    quantity: 0,
    price: 0,
    subtotal: 0,
  });

  useEffect(() => {
    setSelectedPartida({
      id: partida.id,
      code: partida.code,
      description: partida.description.split(" ** ")[0],
      quantity: partida.quantity,
      price: partida.price,
      subtotal: partida.subtotal,
      notes: partida.description.split(" ** ")[1] || "",
    });
  }, [partida]);
  
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Actualizar
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
          Ingrese la cantidad que desea actualizar.
        </Typography>
        <div className={styles.sectionForm}>
          <TextField
            fullWidth
            id="outlined-number"
            label="Number"
            type="number"
            value={selectedPartida.quantity}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => {
              setSelectedPartida({
                ...selectedPartida,
                quantity: event.target.value,
              });
            }}
          />
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
              updatePartida(selectedPartida);
              handleClose();
            }}
          >
            updatePartida
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default ModalUpdate;

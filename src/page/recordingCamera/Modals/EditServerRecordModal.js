import { Box, Grid, makeStyles } from "@material-ui/core";
import BaseButton from "../../traffic/component/BaseButton";
import { editServerArr } from "../../../utils/traffic";
import { useFormContext } from "react-hook-form";
import BaseInputForm from "../../traffic/component/BaseInputForm";
import BaseFormGroup from "../../traffic/component/BaseFormGroup";
import { useContext } from "react";
import { RecordingCameraContext } from "..";

const EditServerRecordModal = () => {
  const { setIsOpenEditModal,handleEditingModal } = useContext(RecordingCameraContext);
  const methods = useFormContext();
  const {
    formState: { errors },
  } = methods;
  const classes = styles();
 

  return (
    <Box className={classes.root}>
      <form onSubmit={methods.handleSubmit(handleEditingModal)}>
        <Grid
          style={{ marginTop: -15, marginBottom: -15 }}
          container
          spacing={6}
        >
          <Grid item md={6}>
            {editServerArr.slice(0, 5).map((item) => {
              if (item.key === "macAddress") {
                return (
                  <BaseFormGroup
                    isEditRecordModal={true}
                    label={item.label}
                    isRequired={true}
                    error={errors[item.key]}
                    widthCustom="auto"
                    showErrorMessage
                    component={
                      <BaseInputForm
                        name={item.key}
                        haveWidth={true}
                        isNoSpace={true}
                        typeInput="normal"
                        variant="outlined"
                        size="small"
                        disabled={true}
                        style={{
                          flex: 1,
                        }}
                      />
                    }
                  />
                );
              } else {
                return (
                  <BaseFormGroup
                    isEditRecordModal={true}
                    label={item.label}
                    isRequired={true}
                    error={errors[item.key]}
                    widthCustom="auto"
                    showErrorMessage
                    component={
                      <BaseInputForm
                        maxLength={item.maxLength}
                        itemRegex={item.pattern}
                        name={item.key}
                        haveWidth={true}
                        isNoSpace={true}
                        typeInput="normal"
                        variant="outlined"
                        size="small"
                        style={{
                          flex: 1,
                        }}
                      />
                    }
                  />
                );
              }
            })}
          </Grid>
          <Grid item md={6}>
            {editServerArr.slice(5, 10).map((item) => {
              if (item.key === "ram" || item.key === "hdd") {
                return (
                  <BaseFormGroup
                    isEditRecordModal={true}
                    label={item.label}
                    widthCustom="auto"
                    component={
                      <BaseInputForm
                        haveAdorment={true}
                        maxLength={item.maxLength}
                        name={item.key}
                        haveWidth={true}
                        typeInput="number"
                        isNoSpace={true}
                        variant="outlined"
                        size="small"
                      />
                    }
                  />
                );
              } else {
                return (
                  <BaseFormGroup
                    isEditRecordModal={true}
                    label={item.label}
                    widthCustom="auto"
                    component={
                      <BaseInputForm
                        maxLength={item.maxLength}
                        name={item.key}
                        haveWidth={true}
                        typeInput="number"
                        isNoSpace={true}
                        variant="outlined"
                        size="small"
                      />
                    }
                  />
                );
              }
            })}
          </Grid>
        </Grid>
        <Box className={classes.footer}>
          <Box style={{ paddingRight: 14 }}>
            <BaseButton
              content={"Cancel"}
              typeStyle={"border"}
              onClick={() => setIsOpenEditModal(false)}
            />
          </Box>
          <Box style={{ paddingLeft: 14 }}>
            <BaseButton
              type="submit"
              content={"Save"}
              typeStyle={"contained"}
            />
          </Box>
        </Box>
      </form>
    </Box>
  );
};

const styles = makeStyles({
  root: {
    maxWidth: 800 ,
  },
  label: { marginRight: 24 },

  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default EditServerRecordModal;

import { Box, Divider, Grid, Typography, makeStyles } from "@material-ui/core";
import BaseButton from "../../traffic/component/BaseButton";
import { editServerArr } from "../../../utils/traffic";
import { FormProvider, useForm } from "react-hook-form";
import BaseInputForm from "../../traffic/component/BaseInputForm";
import BaseFormGroup from "../../traffic/component/BaseFormGroup";
import yup from "../../traffic/javacript/yupGlobal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { RecordingCameraContext } from "..";

const schema = yup.object().shape({
  serverName: yup.string().required("Tên server là trường bắt buộc"),
  macAddress: yup.string().required("Địa chỉ Mac là trường bắt buộc"),
  idAddress: yup.string().required("Địa chỉ ID là trường bắt buộc"),
  publicAddress: yup.string().required("Địa chỉ public là trường bắt buộc"),
  serverLocation: yup.string().required("Vị trí server là trường bắt buộc"),
});

const EditServerRecordModal = () => {
  const { setIsOpenEditModal, defaultEditModalData } = useContext(
    RecordingCameraContext
  );
  const methods = useForm({
    defaultValues: defaultEditModalData,
    resolver: yupResolver(schema),
  });
  const {
    register,
    control,
    formState: { errors },
  } = methods;
  const classes = styles();
  const handleEditingModal = (data) => {
    console.log("data", data);
  };

  return (
    <Box className={classes.root}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleEditingModal)}>
          <Grid
            style={{ marginTop: -15, marginBottom: -15 }}
            container
            spacing={6}
          >
            <Grid item md={6}>
              {editServerArr.slice(0, 5).map((item) => (
                <BaseFormGroup
                  isEditRecordModal={true}
                  label={item.label}
                  isRequired={true}
                  error={errors[item.key]}
                  key={item.key}
                  widthCustom="auto"
                  showErrorMessage
                  component={
                    <BaseInputForm
                      name={item.label}
                      isNoSpace={true}
                      variant="outlined"
                      size="small"
                      style={{
                        flex: 1,
                      }}
                    />
                  }
                />
              ))}
            </Grid>
            <Grid item md={6}>
              {editServerArr.slice(5, 10).map((item) => {
                if (item.key === "ram" || item.key === "hdd") {
                  return (
                    <BaseFormGroup
                      isEditRecordModal={true}
                      label={item.label}
                      key={item.key}
                      widthCustom="auto"
                      component={
                        <BaseInputForm
                          name={item.label}
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
                      key={item.key}
                      label={item.label}
                      widthCustom="auto"
                      component={
                        <BaseInputForm
                          name={item.label}
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
      </FormProvider>
    </Box>
  );
};

const styles = makeStyles({
  root: {
    width: 800,
  },
  label: { marginRight: 24 },

  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default EditServerRecordModal;

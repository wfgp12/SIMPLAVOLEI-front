import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store/hooks";
import "./ProfilePage.scss";
import {
  createDataSheet,
  getDataSheet,
} from "../../service/player/player.service";
import { useForm } from "../../hooks/useForm";
import { ConfigProvider, DatePicker, Modal } from "antd";
import { CreatePlayerForm, PlayerDTO } from "../../models/player";

export const ProfilePage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDataSheet, setIsDataSheet] = useState<PlayerDTO | null>();

  useEffect(() => {
    getDataSheet()
      .then((resp) => {
        setIsDataSheet(resp);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [isModalOpen]);

  const { values, handleChange, setValue, resetForm } =
    useForm<CreatePlayerForm>({
      firstName: "",
      lastName: "",
      birthDate: "",
      age: 0,
      jerseyNumber: 0,
      position: "",
      weight: 0,
      height: 0,
      bloodType: "",
      category: "",
    });

  const handleOk = async () => {
    try {
      await createDataSheet(values as unknown as CreatePlayerForm);
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCancel = () => {
    resetForm();
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="info-card">
        <div className="info-card__img"></div>
        <div className="info-card__info">
          <div className="info-card__info__header">
            {`${user?.name} ${user?.lastName}`}
          </div>
          <div className="info-card__info__content">
            <div className="info-card__info__field">
              <label>Email:</label>
              <span>{user?.email}</span>
            </div>
            <div className="info-card__info__field">
              <label>No. Documento:</label>
              <span>{user?.documentNumber}</span>
            </div>
            <div className="info-card__info__field">
              <label>Fecha de Nacimiento:</label>
              <span>{new Date(user!.dateOfBirth).toLocaleDateString()}</span>
            </div>
            <div className="info-card__info__field">
              <label>País:</label>
              <span>{user?.country}</span>
            </div>
          </div>
          <div className="info-card__info__options">
            {!isDataSheet && (
              <button onClick={() => setIsModalOpen(true)}>
                Crear ficha técnica
              </button>
            )}
          </div>
        </div>
      </div>

      {isDataSheet && (
        <div className="data-sheet">
          <div className="info-card__info__header">
            Ficha técnica de jugador
          </div>
          <div className="data-sheet__content">
            {isDataSheet &&
              Object.keys(isDataSheet).map((key) => (
                <div className="info-card__info__field">
                  <label>{key}</label>
                  <span>{isDataSheet[key as keyof PlayerDTO]}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      <Modal
        title="Crear ficha técnica"
        open={isModalOpen}
        onOk={handleOk}
        footer={[
          <button className="btn-cancel" onClick={handleCancel}>
            Cancelar
          </button>,
          <button onClick={handleOk}>Crear</button>,
        ]}
        onCancel={handleCancel}
      >
        <form className="RegisterPage__form">
          {Object.keys(values).map((key) => (
            <div className="RegisterPage__form__field">
              <label className="RegisterPage__form__label">{key}</label>
              {key === "birthDate" ? (
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimaryHover: "#DBCBFF",
                      colorBgContainer: "#FBF7FF",
                      colorBorder: "transparent",
                    },
                  }}
                >
                  <DatePicker
                    className="RegisterPage__form__date"
                    onChange={(_date, dateString) =>
                      setValue("birthDate", dateString as string)
                    }
                  />
                </ConfigProvider>
              ) : (
                <input
                  className="RegisterPage__form__input"
                  required
                  type={
                    key === "age" ||
                    key === "jerseyNumber" ||
                    key === "weight" ||
                    key === "height"
                      ? "number"
                      : "text"
                  }
                  value={values[key as keyof CreatePlayerForm]}
                  name={key}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
        </form>
      </Modal>
    </>
  );
};

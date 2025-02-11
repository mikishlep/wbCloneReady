<script>
import axios from "axios";
const baseURL = "http://127.0.0.1:8000";

export default {
  name: "addCategory",
  data() {
    return {
      name: "",
      sub_name: "",
      customFields: [],
      isCategoryExisting: false,
    };
  },
  methods: {
    addCustomField() {
      this.customFields.push({ charcName: "", value: "", unitName: "" });
    },
    removeCustomField(index) {
      this.customFields.splice(index, 1);
    },
    toggleCustomFields() {
      if (!this.isCategoryExisting) {
        this.customFields = [];
      }
    },
    async submitCategory(event) {
      event.preventDefault(); // предотвращает перезагрузку страницы

      let payload;

      if (this.isCategoryExisting) {
        payload = {
          name: this.sub_name, // Используем подкатегорию как имя
          characters_valid: this.customFields.map(field => ({
            value: field.value,
            charcName: field.charcName,
            unitName: field.unitName
          })),
          size_visible: true,
          sub_name: this.name // Используем категорию как sub_name
        };
      } else {
        payload = {
          name: this.name,
          characters_valid: [{ value: "", charcName: "", unitName: "" }],
          size_visible: true,
          sub_name: this.sub_name || ""
        };
      }

      try {
        const response = await axios.post(`${baseURL}/api/catalog`, payload);
        console.log("Категория создана:", response.data);
        alert("Категория успешно создана!");
      } catch (error) {
        console.error("Ошибка при создании категории:", error);
        alert("Ошибка при отправке запроса.");
      }
    }
  },
};
</script>

<template>
  <div class="app-content">
    <form class="add-category" @submit="submitCategory">
      <div class="form-input-wrapper">
        <h1 class="title">Создание категории</h1>
        <div class="inputs">
          <div class="input-fields">
            <div class="input-wrapper">
              <span>Название категории</span>
              <input type="text" v-model="name" class="input-field" required />
            </div>
            <div class="input-wrapper" v-if="isCategoryExisting">
              <span>Название подкатегории</span>
              <input type="text" v-model="sub_name" class="input-field" />
            </div>
            <div class="input-wrapper">
              <input type="checkbox" v-model="isCategoryExisting" @change="toggleCustomFields" />
              <span>Категория уже создана</span>
            </div>

            <div v-if="isCategoryExisting" class="custom-input-wrapper">
              <h3>Кастомные поля</h3>
              <div v-for="(field, index) in customFields" :key="index" class="custom-field">
                <input v-model="field.charcName" placeholder="Характеристика" class="input-field" />
                <input v-model="field.value" placeholder="Значение" class="input-field" />
                <input v-model="field.unitName" placeholder="Единица измерения" class="input-field" />
                <button type="button" @click="removeCustomField(index)">❌</button>
              </div>
              <button type="button" @click="addCustomField" class="add-button">Добавить поле</button>
            </div>

            <div class="input-wrapper">
              <button type="submit" class="submit-button">Подтвердить</button>
            </div>
          </div>

          <div class="input-wrapper">
            <ul>
              <li>Если указать только категорию, она будет создана.</li>
              <li>Если указать категорию и подкатегорию, подкатегория привяжется к этой категории.</li>
              <li>Если заполнить подкатегорию, но не заполнять категорию, то ничего не будет.</li>
              <li>Для добавления характеристик требуется включить "Категория уже создана".</li>
            </ul>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
:root {
  --header-height: 60px;
}

.app-content {
  padding-top: var(--header-height);
}

.title {
  font-size: 35px;
  font-weight: 700;
  text-align: center;
  margin-top: 30px;
}

.inputs {
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
}

.input-fields {
  display: grid;
  gap: 10px;
  border: 1px solid #b3b3b3;
  padding: 20px;
  border-radius: 8px;
}

.input-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.input-field {
  border: 1px solid #282828;
  border-radius: 6px;
  padding: 4px 12px;
  margin-left: 5px;
}

.custom-input-wrapper {
  margin-top: 20px;
}

.custom-field {
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
}

.add-button {
  background: #4CAF50;
  color: white;
  padding: 5px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.submit-button {
  background: #b3b3b3;
  padding: 3px 5px;
  border-radius: 6px;
  width: 100%;
}
</style>
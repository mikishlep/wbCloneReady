<script>
import axios from "axios";
const baseURL = "http://127.0.0.1:8000";

export default {
  name: "addCategory",
  data() {
    return {
      // Данные для создания категории/подкатегории
      name: "",
      sub_name: "",
      customFields: [],
      isCategoryExisting: false,
      // Данные для работы с уже созданными категориями/подкатегориями
      catalogs: [],
      selectedCatalog: "",
      customFieldsForUpdate: []
    };
  },
  computed: {
    // Вычисляемое свойство для категорий (где sub_name отсутствует)
    categories() {
      return this.catalogs.filter(catalog => !catalog.sub_name);
    },
    // Вычисляемое свойство для подкатегорий (где sub_name присутствует)
    subcategories() {
      return this.catalogs.filter(catalog => catalog.sub_name);
    }
  },
  methods: {
    // Методы для создания категории/подкатегории
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
          // Имя подкатегории берём из sub_name, а родительская категория — из name
          name: this.sub_name,
          characters_valid: this.customFields.map(field => ({
            value: field.value,
            charcName: field.charcName,
            unitName: field.unitName.trim() ? field.unitName : "г" // если пусто — "г"
          })),
          size_visible: true,
          sub_name: this.name
        };
      } else {
        payload = {
          name: this.name,
          // Даже если пользователь не заполнил кастомные поля, unitName по умолчанию будет "г"
          characters_valid: [{ value: "", charcName: "", unitName: "г" }],
          size_visible: true,
          sub_name: this.sub_name || ""
        };
      }

      try {
        const response = await axios.post(`${baseURL}/api/catalog`, payload);
        console.log("Категория создана:", response.data);
        alert("Категория успешно создана!");
        // Обновляем список после создания
        this.fetchCatalogs();
      } catch (error) {
        console.error("Ошибка при создании категории:", error);
        alert("Ошибка при отправке запроса.");
      }
    },
    // Методы для работы с уже созданными категориями/подкатегориями
    async fetchCatalogs() {
      try {
        const response = await axios.get(`${baseURL}/api/catalogs`);
        // Сохраняем все записи (категории и подкатегории)
        this.catalogs = response.data;
      } catch (error) {
        console.error("Ошибка при получении каталогов:", error);
      }
    },
    addCustomFieldForUpdate() {
      this.customFieldsForUpdate.push({ charcName: "", value: "", unitName: "" });
    },
    removeCustomFieldForUpdate(index) {
      this.customFieldsForUpdate.splice(index, 1);
    },
    async updateCatalogFields() {
      if (!this.selectedCatalog) {
        alert("Выберите подкатегорию для обновления");
        return;
      }

      // Формируем обновлённый список кастомных полей,
      // для каждого поля, если unitName пустой, отправляем "г"
      const updatedFields = this.customFieldsForUpdate.map(field => ({
        value: field.value,
        charcName: field.charcName,
        unitName: field.unitName.trim() ? field.unitName : "г"
      }));

      const payload = {
        name: this.selectedCatalog.name,
        characters_valid: updatedFields,
        size_visible: this.selectedCatalog.size_visible,
        sub_name: this.selectedCatalog.sub_name
      };

      try {
        // Отправляем PUT запрос для обновления выбранной подкатегории
        const response = await axios.put(`${baseURL}/api/catalogs/${this.selectedCatalog.id}`, payload);
        console.log("Подкатегория обновлена:", response.data);
        alert("Подкатегория успешно обновлена!");
        this.fetchCatalogs(); // Обновляем список после обновления
      } catch (error) {
        console.error("Ошибка при обновлении подкатегории:", error);
        alert("Ошибка при обновлении подкатегории.");
      }
    },
    async deleteCatalog(catalog) {
      // Определяем тип записи для отображения в подтверждении
      const type = catalog.sub_name ? "подкатегорию" : "категорию";
      if (!confirm(`Вы уверены, что хотите удалить ${type}: ${catalog.name}?`)) {
        return;
      }
      try {
        const response = await axios.delete(`${baseURL}/api/catalogs/${catalog.id}`);
        console.log(`${type} удалена:`, response.data);
        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} успешно удалена!`);
        this.fetchCatalogs(); // Обновляем список после удаления
      } catch (error) {
        console.error("Ошибка при удалении:", error);
        alert("Ошибка при удалении.");
      }
    }
  },
  watch: {
    // При выборе подкатегории для обновления заполняем форму её текущими кастомными полями
    selectedCatalog(newVal) {
      if (newVal) {
        this.customFieldsForUpdate = newVal.characters_valid.map(field => ({
          charcName: field.charcName || "",
          value: field.value || "",
          unitName: field.unitName || ""
        }));
      } else {
        this.customFieldsForUpdate = [];
      }
    }
  },
  mounted() {
    this.fetchCatalogs();
  }
};
</script>

<template>
  <div class="app-content">
    <!-- Форма для создания категории/подкатегории -->
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
              <li>Значения кастомного поля заполняйте через запятую БЕЗ ПРОБЕЛА!</li>
              <li>При первичном создании подкатегории, обязательно требуется указать хотя бы одно кастомное поле!</li>
            </ul>
          </div>
        </div>
      </div>
    </form>

    <!-- Секция для обновления (добавления полей) в уже созданных подкатегориях -->
    <div class="update-category-wrapper">
      <div class="update-category">
        <h2>Добавить поля к существующей подкатегории</h2>
        <div class="input-wrapper">
          <span>Выберите подкатегорию:</span>
          <!-- Отображаются только подкатегории -->
          <select v-model="selectedCatalog">
            <option disabled value="">-- Выберите подкатегорию --</option>
            <option
                v-for="catalog in subcategories"
                :key="catalog.id"
                :value="catalog"
            >
              {{ catalog.sub_name }} → {{ catalog.name }}
            </option>
          </select>
        </div>
        <div v-if="selectedCatalog" class="custom-input-wrapper">
          <h3>Кастомные поля для {{ selectedCatalog.name }}</h3>
          <div
              v-for="(field, index) in customFieldsForUpdate"
              :key="index"
              class="custom-field"
          >
            <input v-model="field.charcName" placeholder="Характеристика" class="input-field" />
            <input v-model="field.value" placeholder="Значение" class="input-field" />
            <input v-model="field.unitName" placeholder="Единица измерения" class="input-field" />
            <button type="button" @click="removeCustomFieldForUpdate(index)">❌</button>
          </div>
          <button type="button" @click="addCustomFieldForUpdate" class="add-button">
            Добавить поле
          </button>
        </div>
        <div class="input-wrapper" v-if="selectedCatalog" style="margin-top: 10px;">
          <button type="button" @click="updateCatalogFields" class="submit-button">
            Обновить подкатегорию
          </button>
        </div>
      </div>
    </div>

    <!-- Секция для удаления категорий и подкатегорий с визуальным разделением -->
    <div class="delete-category-wrapper">
      <div class="delete-category">
        <h2>Удаление категорий и подкатегорий</h2>
        <div class="delete-section">
          <h3>Категории</h3>
          <ul>
            <li v-for="catalog in categories" :key="catalog.id" class="delete-item">
              <span>{{ catalog.name }}</span>
              <button type="button" @click="deleteCatalog(catalog)" class="delete-button">
                Удалить
              </button>
            </li>
          </ul>
        </div>
        <div class="delete-section">
          <h3>Подкатегории</h3>
          <ul>
            <li v-for="catalog in subcategories" :key="catalog.id" class="delete-item">
              <span>{{ catalog.sub_name }} → {{ catalog.name }}</span>
              <button type="button" @click="deleteCatalog(catalog)" class="delete-button">
                Удалить
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --header-height: 60px;
}

.app-content {
  padding-top: var(--header-height);
}

/* Основные заголовки */
.title {
  font-size: 35px;
  font-weight: 700;
  text-align: center;
  margin-top: 30px;
}

/* Сетка для создания/обновления */
.inputs {
  margin-top: 50px;
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr;
  padding: 0 20px;
}

/* Стили для блоков формы */
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
  margin-bottom: 10px;
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
  background: #4caf50;
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

/* Стили для секции обновления подкатегории */
.update-category {
  margin-top: 20px;
  border: 1px solid #b3b3b3;
  padding: 20px;
  border-radius: 8px;
}

.update-category-wrapper {
  padding: 20px;
}

/* Стили для секции удаления */
.delete-category-wrapper {
  padding: 20px;
}

.delete-category {
  border: 1px solid #b3b3b3;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.delete-section {
  margin-bottom: 20px;
}

.delete-section h3 {
  margin-bottom: 10px;
}

.delete-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  border-bottom: 1px solid #e0e0e0;
}

.delete-button {
  background: #e53935;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 3px 8px;
  cursor: pointer;
}
</style>
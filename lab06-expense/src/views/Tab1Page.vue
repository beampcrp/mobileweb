<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>เพิ่มรายการ</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>รายรับ / รายจ่าย</ion-card-title>
          <ion-card-subtitle>กรอกรายละเอียดรายการ</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          <ion-input
            label="ชื่อรายการ"
            label-placement="floating"
            fill="outline"
            v-model="title"
          />

          <ion-input
            class="field"
            label="จำนวนเงิน"
            label-placement="floating"
            fill="outline"
            type="number"
            v-model="amount"
          />

          <ion-select
            class="field"
            label="ประเภท"
            label-placement="floating"
            fill="outline"
            v-model="type"
          >
            <ion-select-option value="income">รายรับ</ion-select-option>
            <ion-select-option value="expense">รายจ่าย</ion-select-option>
          </ion-select>

          <ion-input
            class="field"
            label="หมวดหมู่"
            label-placement="floating"
            fill="outline"
            v-model="category"
          />

          <ion-textarea
            class="field"
            label="หมายเหตุ"
            label-placement="floating"
            fill="outline"
            auto-grow
            v-model="note"
          />

          <ion-button
            expand="block"
            size="large"
            color="success"
            class="save-btn"
            @click="saveExpense"
          >
            💾 บันทึกข้อมูล
          </ion-button>
          <ion-toast
  :is-open="showToast"
  message="บันทึกข้อมูลเรียบร้อย"
  duration="2000"
  color="success"
  @didDismiss="showToast = false"
/>

        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
<style scoped>

.field {
  margin-top: 14px;
}

.save-btn {
  margin-top: 24px;
  border-radius: 12px;
}

ion-card {
  border-radius: 16px;
}
</style>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
} from "@ionic/vue";

import { ref } from "vue";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { IonToast } from "@ionic/vue";

import { useRouter } from "vue-router";

const router = useRouter();
const showToast = ref(false);

const title = ref("");
const amount = ref<number | null>(null);
const type = ref("expense");
const category = ref("");
const note = ref("");

const saveExpense = async () => {
  if (!title.value || amount.value === null) {
    alert("กรุณากรอกชื่อรายการและจำนวนเงิน");
    return;
  }

  await addDoc(collection(db, "expenses"), {
    title: title.value,
    amount: Number(amount.value),
    type: type.value,
    category: category.value,
    note: note.value,
    createdAt: new Date(),
  });

  // 🔔 แสดง Toast
  showToast.value = true;


  title.value = "";
  amount.value = null;
  type.value = "expense";
  category.value = "";
  note.value = "";
};


</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>แก้ไขรายการ</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-input label="ชื่อรายการ" v-model="title" />
      <ion-input label="จำนวนเงิน" type="number" v-model="amount" />
      <ion-select label="ประเภท" v-model="type">
        <ion-select-option value="income">รายรับ</ion-select-option>
        <ion-select-option value="expense">รายจ่าย</ion-select-option>
      </ion-select>
      <ion-input label="หมวดหมู่" v-model="category" />

      <ion-button expand="block" color="success" @click="updateExpense">
        อัปเดตข้อมูล
      </ion-button>

      <!-- 🔴 ปุ่มลบ -->
      <ion-button
        expand="block"
        color="danger"
        fill="outline"
        @click="showAlert = true"
      >
        ลบข้อมูล
      </ion-button>

      <!-- ⚠️ กล่องยืนยัน -->
      <ion-alert
        :is-open="showAlert"
        header="ยืนยันการลบ"
        message="คุณต้องการลบรายการนี้ใช่หรือไม่?"
        :buttons="alertButtons"
        @didDismiss="showAlert = false"
      />
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonInput, IonSelect,
  IonSelectOption, IonButton, IonAlert
} from "@ionic/vue";

import { ref, onMounted } from "vue";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

const title = ref("");
const amount = ref(0);
const type = ref("expense");
const category = ref("");

const showAlert = ref(false);

onMounted(async () => {
  const snap = await getDoc(doc(db, "expenses", id));
  if (snap.exists()) {
    const data = snap.data();
    title.value = data.title;
    amount.value = data.amount;
    type.value = data.type;
    category.value = data.category;
  }
});

const updateExpense = async () => {
  await updateDoc(doc(db, "expenses", id), {
    title: title.value,
    amount: Number(amount.value),
    type: type.value,
    category: category.value,
  });

  router.push("/tabs/list");
};

const deleteExpense = async () => {
  await deleteDoc(doc(db, "expenses", id));
  router.push("/tabs/list");
};

const alertButtons = [
  {
    text: "ยกเลิก",
    role: "cancel",
  },
  {
    text: "ลบ",
    role: "destructive",
    handler: deleteExpense,
  },
];
</script>


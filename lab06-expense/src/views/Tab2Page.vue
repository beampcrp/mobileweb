<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>รายการรายรับ–รายจ่าย</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <!-- 🔢 สรุปยอด -->
      <ion-card>
        <ion-card-content>
          <p>รายรับรวม: <b style="color:green">{{ totalIncome }}</b> บาท</p>
          <p>รายจ่ายรวม: <b style="color:red">{{ totalExpense }}</b> บาท</p>
        </ion-card-content>
      </ion-card>

      <!-- 📋 รายการ -->
      <ion-list>
        <ion-item
          v-for="item in expenses"
          :key="item.id"
          button
          @click="goEdit(item.id)"
        >
          <ion-label>
            <h2>{{ item.title }}</h2>
            <p>{{ item.category }}</p>
          </ion-label>

          <ion-badge
            slot="end"
            :color="item.type === 'income' ? 'success' : 'danger'"
          >
            {{ item.amount }} บาท
          </ion-badge>
        </ion-item>
      </ion-list>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonList, IonItem, IonLabel,
  IonBadge, IonCard, IonCardContent
} from "@ionic/vue";

import { ref, onMounted } from "vue";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "vue-router";

interface Expense {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
}

const router = useRouter();
const expenses = ref<Expense[]>([]);
const totalIncome = ref(0);
const totalExpense = ref(0);

onMounted(() => {
  const q = query(collection(db, "expenses"), orderBy("createdAt", "desc"));

onSnapshot(q, (snapshot) => {
  expenses.value = [];
  totalIncome.value = 0;
  totalExpense.value = 0;

  snapshot.forEach((docSnap) => {
    const data = docSnap.data() as Omit<Expense, "id">;

    const item: Expense = {
      id: docSnap.id,
      ...data,
    };

    expenses.value.push(item);

    if (item.type === "income") {
      totalIncome.value += item.amount;
    } else {
      totalExpense.value += item.amount;
    }
  });
});
});

const goEdit = (id: string) => {
  router.push(`/tabs/edit/${id}`);
};
</script>

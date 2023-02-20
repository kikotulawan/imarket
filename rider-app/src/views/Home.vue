<template>
 <div class="container vh-100 w-100 px-3 d-flex flex-column align-items-start">
  <v-btn fab small color="transparent" elevation="0" class="mt-5" @click="logout"
   ><svg width="25" height="25" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
  </v-btn>
  <div class="animate__animated animate__fadeIn">
   <p class="text-dark text-lg mt-10 mb-0 pb-0 lh-1">Hi, Aimee!</p>
   <p class="text-secondary text-subtitle-2 mb-10">There are 1 new order(s), pick one now and deliver!</p>
   <p class="text-secondary text-subtitle-2">Click on orders to view details and map direction</p>
   <v-card v-for="(order, i) in orders" :key="i" class="w-100 p-3 d-flex flex-row align-items-center mt-3" @click="goToDetails(order)" elevation="2">
    <v-avatar class="mr-3">
     <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
    </v-avatar>
    <div>
     <p class="text-dark fw-bold lh-1 mb-0 pb-0">{{ order.buyer.full_name }}</p>
     <p class="text-dark text-subtitle-2 lh-1 mb-0 pb-0">{{ order.buyer.user.address.formatted_address }}</p>
    </div>
   </v-card>
  </div>
 </div>
</template>
<script>
 export default {
  data() {
   return {
    isLoading: false,
    data: {
     email: "",
     password: "",
    },
    orders: [],
   };
  },
  async mounted() {
   await this.allOrders();
   console.log("mounted");
  },
  methods: {
   goToDetails(item) {
    if (item.status == "Pending") {
     this.$router.push({ path: `/order-details/${item.id}` });
    } else if (item.status == "Your order is on its way") {
     this.$router.push({ path: `/order-accepted/${item.id}` });
    } else if (item.status == "Order delivered") {
     this.$router.push({ path: `/order-completed/${item.id}` });
    }
   },
   async allOrders() {
    const res = await this.$store.dispatch("auth/allOrders");
    this.orders = res.data;
    console.log(this.orders);
   },
   async logout() {
    await this.$store.dispatch("auth/logout");
    this.$router.push("/");
   },
  },
 };
</script>

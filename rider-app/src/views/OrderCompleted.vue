<template>
 <div class="container vh-100 w-100 px-3 pb-10 d-flex flex-column align-items-start overflow-y-auto">
  <div class="w-100 d-flex justify-content-between pr-3 mb-10">
   <v-btn fab small color="transparent" elevation="0" class="mt-5"
    ><svg xmlns="http://www.w3.org/2000/svg" fill="#000" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="30" height="30">
     <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
   </v-btn>
   <v-btn fab small color="transparent" elevation="0" class="mt-5" @click="close"
    ><svg xmlns="http://www.w3.org/2000/svg" fill="#ff3131" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff3131" width="25" height="25">
     <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
   </v-btn>
  </div>
  <div class="animate__animated animate__slideInLeft">
   <p class="text-success text-h4 fw-bold mb-0 pb-0 lh-1">ORDER COMPLETED</p>
   <p class="text-secondary text-subtitle-2 mb-10">Delivery successful</p>
  </div>
  <div class="animate__animated animate__slideInUp w-100">
   <p class="text-secondary text-subtitle-2 mb-0 pb-0">Delivery Address</p>
   <p class="text-dark text-subtitle-2 fw-bold lh-1 mb-0 pb-0">{{ order.buyer.user.address.formatted_address }}</p>
   <p class="text-secondary text-subtitle-2 lh-1 mb-0 pb-0 mt-5">ITEMS</p>
   <hr />
   <div class="mt-2" v-for="(info, i) in order.content" :key="i">
    <p class="text-dark text-subtitle-2 fw-bold lh-1 mb-0 pb-0">{{ info.product.product_info.name }}</p>
    <p class="text-secondary text-subtitle-2 mb-0 pb-0">Quantity: {{ info.quantity }}</p>
    <p class="text-secondary text-subtitle-2 mb-0 pb-0"
     >Subtotal: <span class="text-primary">PHP {{ order.subtotal }}.00</span></p
    >
   </div>
   <v-card class="my-3 p-3" elevation="2">
    <div>
     <div class="d-flex justify-content-between">
      <p class="text-dark text-caption fw-bold lh-1 mb-0 pb-0">Subtotal</p>
      <p class="text-dark text-caption fw-bold lh-1 mb-0 pb-0">PHP {{ order.subtotal }}.00</p>
     </div>
     <div class="d-flex justify-content-between my-2">
      <p class="text-dark text-caption fw-bold lh-1 mb-0 pb-0">Delivery Fee</p>
      <p class="text-dark text-caption fw-bold lh-1 mb-0 pb-0">PHP 100.00</p>
     </div>
     <div class="d-flex justify-content-between">
      <p class="text-dark text-caption fw-bold lh-1 mb-0 pb-0">Discount</p>
      <p class="text-dark text-caption fw-bold lh-1 mb-0 pb-0">PHP 0</p>
     </div>
     <hr />
     <div class="d-flex justify-content-between">
      <p class="text-dark text-caption fw-bold lh-1 mb-0 pb-0">Total Payment</p>
      <p class="text-dark text-caption fw-bold lh-1 mb-0 pb-0">PHP {{ order.total }}.00</p>
     </div>
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
    order: {
     buyer: {
      user: {
       address: {},
      },
     },
    },
   };
  },
  async mounted() {
   await this.orderInfo();
  },
  methods: {
   close() {
    this.$router.push("/home");
   },
   async orderInfo() {
    const res = await this.$store.dispatch("auth/orderInfo", this.$route.params.id);
    this.order = res.data;
    console.log(this.order);
   },
  },
 };
</script>

<template>
 <div class="container vh-100 w-100 d-flex flex-column justify-content-center align-items-center">
  <p class="text-dark text-lg">IMarket</p>
  <div class="text-left w-100 px-2 pt-5">
   <h1 class="text-dark fw-bold">Login</h1>
   <p class="text-dark">Welcome! Please enter your credentials to proceed to your account.</p>
  </div>
  <form ref="form" @submit.prevent="login" class="card p-2 border-0 w-100">
   <v-text-field v-model="data.email" label="Email Address" required type="email" single-line outlined></v-text-field>
   <v-text-field v-model="data.password" class="mb-0" label="Password" required type="password" single-line outlined></v-text-field>
   <hr class="mt-0" />
   <v-btn class="text-white mt-1" type="submit" block depressed raised elevation="3" style="background: #f67c01"> LOGIN ACCOUNT </v-btn>
  </form>
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
   };
  },
  mounted() {
   console.log("mounted");
  },
  methods: {
   async login() {
    this.isLoading = true;
    const { data, status } = await this.$store.dispatch("auth/login", this.data);
    if (status == 200) {
     this.$refs.form.reset();
     this.$router.push("/home");
    } else {
     this.$toast.error("Email or Password is incorrect!");
    }
    this.isLoading = false;
   },
  },
 };
</script>

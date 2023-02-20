<template>
 <v-sheet class="overflow-hidden">
  <v-btn color="transparent" class="px-0 ml-3 mt-5" elevation="0" @click.stop="drawer = !drawer"> <v-icon color="blue" class="ml-n10">mdi-menu</v-icon> </v-btn>
  <v-navigation-drawer v-model="drawer" fixed temporary>
   <v-list-item>
    <v-list-item-avatar>
     <v-img v-if="user.info.profile_img" :src="'https://imarketbe.capstone-group.online/images/profiles/' + user.info.profile_img" alt="John"></v-img>
    </v-list-item-avatar>

    <v-list-item-content>
     <v-list-item-title>{{ user.info.last_name }}, {{ user.info.first_name }}</v-list-item-title>
     <p class="mb-0 grey--text">
      <small
       >User Type: <span class="primary--text">{{ user && user.roles[0].name }}</span></small
      >
     </p>
    </v-list-item-content>
   </v-list-item>

   <v-divider></v-divider>

   <v-list dense>
    <v-subheader>MENU</v-subheader>
    <v-list-item v-if="user.roles && user.roles[0].name == 'Super Admin'" link to="/admin">
     <v-list-item-icon>
      <v-icon small>mdi-shield-edit</v-icon>
     </v-list-item-icon>
     <v-list-item-content>
      <v-list-item-title>System Settings</v-list-item-title>
     </v-list-item-content>
    </v-list-item>

    <v-list-item v-if="user.roles && user.roles[0].name != 'Super Admin'" link to="/">
     <v-list-item-icon>
      <v-icon small>mdi-home-outline</v-icon>
     </v-list-item-icon>
     <v-list-item-content>
      <v-list-item-title>Home</v-list-item-title>
     </v-list-item-content>
    </v-list-item>

    <v-list-item v-if="user.roles && user.roles[0].name != 'Super Admin'" link to="/cart-checkout">
     <v-list-item-icon>
      <v-icon small>mdi-cart</v-icon>
     </v-list-item-icon>
     <v-list-item-content>
      <v-list-item-title>View Cart</v-list-item-title>
     </v-list-item-content>
    </v-list-item>

    <v-list-item v-if="user.roles && user.roles[0].name != 'Super Admin'" link to="/orders">
     <v-list-item-icon>
      <v-icon small>mdi-package</v-icon>
     </v-list-item-icon>
     <v-list-item-content>
      <v-list-item-title>My Orders</v-list-item-title>
     </v-list-item-content>
    </v-list-item>

    <v-list-item v-if="user.roles && user.roles[0].name == 'Seller'" link to="/manage-products">
     <v-list-item-icon>
      <v-icon small>mdi-package-variant</v-icon>
     </v-list-item-icon>
     <v-list-item-content>
      <v-list-item-title>My Store</v-list-item-title>
     </v-list-item-content>
    </v-list-item>

    <v-list-item v-if="user.roles && user.roles[0].name != 'Super Admin'" link to="/account-settings">
     <v-list-item-icon>
      <v-icon small>mdi-cog</v-icon>
     </v-list-item-icon>
     <v-list-item-content>
      <v-list-item-title>Account Settings</v-list-item-title>
     </v-list-item-content>
    </v-list-item>

    <v-list-item link @click.prevent="logoutDialog = true">
     <v-list-item-icon>
      <v-icon small>mdi-location-exit</v-icon>
     </v-list-item-icon>
     <v-list-item-content>
      <v-list-item-title>Logout</v-list-item-title>
     </v-list-item-content>
    </v-list-item>
   </v-list>
  </v-navigation-drawer>

  <v-dialog v-model="logoutDialog" max-width="500">
   <v-card>
    <v-card-title class="text-h5"> Confirm Log-out </v-card-title>
    <h4 class="font-weight-light ml-6 mr-5 mb-5">Are you sure you want to logout your account?</h4>
    <v-card-actions class="pb-2">
     <v-spacer></v-spacer>
     <v-btn color="grey darken-2" large text @click="logoutDialog = false"> Cancel </v-btn>
     <v-btn color="red darken-1" large text @click="logout" :loading="btnLoading"> Logout </v-btn>
    </v-card-actions>
   </v-card>
  </v-dialog>
 </v-sheet>
</template>
<script>
 import API from "../../store/base/base";
 import { mapState } from "vuex";
 //  import CartDropDown from "./CartDropDown.vue";
 export default {
  data: () => ({
   name: "",
   isCartVisible: false,
   showMenu: false,
   logoutDialog: false,
   btnLoading: false,
   isFixed: false,
   drawer: null,
   items: [
    { title: "Home", icon: "mdi-view-dashboard" },
    { title: "About", icon: "mdi-forum" },
   ],
  }),
  //   components: { CartDropDown },
  async mounted() {
   if (this.$route.path == "/") {
    await this.$store.dispatch("market/cartCount");
   }
  },
  created() {
   window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
   window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
   async logout() {
    this.btnLoading = true;
    const { status, data } = await this.$store.dispatch("auth/logout");
    this.toastData(status, data);
    this.btnLoading = false;
    this.$router.push("/");
    this.logoutDialog = false;
   },
   handleScroll(event) {
    this.scrollPosition = window.scrollY;
    if (this.scrollPosition >= 10) {
     this.isFixed = true;
    } else {
     this.isFixed = false;
    }
   },
   async uploadProfileImage(event) {
    let formData = new FormData();
    formData.append("img", event.target.files[0]);
    await API.post(`update-profile`, formData, {
     headers: {
      "Content-Type": "multipart/form-data",
     },
    })
     .then((response) => {
      this.toastData(200, { msg: "Profile image updated successfully!" });
     })
     .catch((error) => {
      console.log({ error });
     });
    await this.$store.dispatch("auth/checkUser");
   },
  },
  computed: {
   ...mapState("market", ["cart_count"]),
   ...mapState("auth", ["user"]),
  },
  watch: {},
 };
</script>

<style lang="scss">
 .logo p {
  // font-size: 1.4rem;
  font-weight: 600;
 }

 nav {
  width: 100%;
  padding: 2rem 2.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 5;
  top: 0;
  left: 0;
  transition: all 250ms ease-in-out;

  & ul {
   display: flex;
   list-style: none;

   & li {
    padding: 0 1rem;

    & a {
     text-decoration: none;
     color: rgb(29, 29, 29) !important;
     position: relative;
     // transition: all 250ms ease-in-out;
     text-transform: uppercase;
     font-weight: 600;

     &:hover {
      color: #ff9800 !important;
     }

     &:hover:before {
      width: 100%;
      transform-origin: right;
     }

     &:before {
      content: "";
      position: absolute;
      width: 0;
      bottom: -5px;
      left: 0;
      height: 2.5px;
      background-color: #ff9800 !important;
      transition: all 250ms ease-in-out;
     }
    }
   }
  }
 }

 .upload-image {
  position: absolute;
  bottom: -5px;
  right: 0;
  background: #1976d2f5;
  border-radius: 50%;
  padding: 0.2rem 0.35rem;
  display: flex;
  align-items: center;
  justify-content: center;
 }

 .v-list-item__icon {
  margin-right: 18px !important;
 }
</style>

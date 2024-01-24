<template>
    <div class="container-fluid py-5" style="background-color: #f5f5f5">
      <div style="background-color: #ffffff" class="p-5 m-auto signup-form">
        <div class="text-center">
          <img src="../../assets/images/logo.png" alt="Logo" />
          <h2 class="mt-4">Create your account</h2>
          <p>Enter your details to use all the app features.</p>
        </div>
        <form class="mt-3" @submit.prevent="register">
          <div class="row">
            <div class="col-md-6">
                <!-- firstname -->
                <base-input v-model="signupData.firstname" type="text" identity="fistname" placeholder="Ex: Jack" label="Firstname"></base-input>
            </div>
            <div class="col-md-6">
                <!-- Lastname -->
                <base-input v-model="signupData.lastname" type="text" identiy="lastname" placeholder="Ex: Daniel" label="Lastname"></base-input>
            </div>
          </div>
          <div class="my-4">
            <!-- Username -->
            <base-input v-model="signupData.username" type="text" identity="username" placeholder="Your username" label="Username"></base-input>
        </div>
          <div class="my-4">
            <!-- Email -->
            <base-input v-model="signupData.email" type="email" identity="email" placeholder="Your email" label="Email"></base-input>
        </div>
          <div class="my-4">
            <!-- Password -->
            <base-input v-model="signupData.password" type="password" identity="password" placeholder="Your password" label="Password" @keyInput="passwordCheck"></base-input>
            <p class="text-danger mt-1 fw-medium" style="font-size: 11px;" :style="{display: passwordStatusDisplay}">
                Paan tuh pendek amat minimal 8 huruf lah
            </p>
        </div>
          <div class="my-4">
            <!-- Confirm Password -->
            <base-input @keyInput="confirmationPasswordCheck" v-model="signupData.confirmationPassword" type="password" identiy="passwordConfirmation" placeholder="Cofirmation your password" label="Password confirmation"></base-input>
            <p class="text-danger fw-medium mt-1" style="font-size: 11px;" :style="{ display: confirmPasswordDoesNotMatch }">
              password nya ga sama woeee
            </p>
            <p class="text-success fw-medium mt-1" style="font-size: 11px;" :style="{ display: confirmPasswordMatch }">
              keysipp passwordnya sama
            </p>
        </div>
        <div class="my-4">
            <base-input type="file" identity="recipeImage"
            label="Profile Photo" isImage="true" @input="checkImage">
                <div>
                    <div class="border p-1 mt-2 rounded-circle">
                        <img :src="signupData.imageLink" class="rounded-circle" width="140" height="150" style="object-fit:
                        cover"/>
                    </div>
                    <div class="text-center"  style="transform: translateY(-24px)" >
                        <i class="fa-solid fa-camera fs-5 p-2 rounded-circle bg-white" ></i>
                    </div>
                </div>
            </base-input>
        </div>
        </form>
        <base-button @click="register" class="login w-100 my-3">Register</base-button>
        <div class="text-center mt-4">
          <p class="fw-semibold">
            Already have account?<span style="color: #4c4ddc"
              ><router-link to="/login" class="text-decoration-none ms-2">Login</router-link></span
            >
          </p>
        </div>
      </div>
    </div>
</template>

<script setup>
    import BaseInput from "../ui/BaseInput.vue"
    import BaseButton from "../ui/BaseButton.vue"
    import { reactive, ref } from "vue";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";

    const store = useStore()
    const router = useRouter()

    const signupData = reactive({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirmationPassword: "",
        isLogin: false,
        imageLink: "",
    })

    const passwordStatusDisplay = ref("none")

    const passwordCheck = () => {
        if (signupData.password.length < 8) {
            passwordStatusDisplay.value = "block";
            console.log(signupData.password)
        } else {
            passwordStatusDisplay.value = "none"
            console.log("oke sudah")
        }
    }

    const confirmPasswordDoesNotMatch = ref("none");
    const confirmPasswordMatch = ref("none");

    const confirmationPasswordCheck = () => {
      // console.log("bisa kok")
      console.log(signupData.confirmationPassword)
      if (signupData.confirmationPassword === "") {
        confirmPasswordMatch.value = "none"
        confirmPasswordDoesNotMatch.value = "none"
      } else if (signupData.confirmationPassword === signupData.password) {
        confirmPasswordMatch.value = "block"
        confirmPasswordDoesNotMatch.value = "none"
      } else {
        confirmPasswordMatch.value = "none"
        confirmPasswordDoesNotMatch.value = "block"
      }
    };

    const checkImage = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.addEventListener ("load", () => {
        signupData. imageLink = reader.result;
      });
    };

    const register = async () => {
      if (signupData. password !== signupData.confirmationPassword || signupData. password.length < 8) {
        signupData. confirmationPassword = "";
        signupData. password = "";
        confirmPasswordDoesNotMacth. value = "none";
        confirmPasswordMacth. value = "none";
      } else {
        await store.dispatch("auth/getRegisterData" , signupData);
        router.push("/");
      }
    }
</script>
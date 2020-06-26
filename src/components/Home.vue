<template>
    <div>
    <form
        @submit="checkForm"
        action="https://vuejs.org/"
        method="post"
        novalidate="true"
    
    >
    <div>
        <h1>Login Page</h1>
            <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
            <li v-for="error in errors" v-bind:key=error>{{ error }}</li>
            </ul>
        </p>
        
        <hr>
          <div class="form-group">
                        <label for="username">Username</label>
                        <ValidationProvider name="Username" rules="required|alpha_num" v-slot="{ errors }">
                        <input
                                type="require"
                                id="username"
                                class="form-control"
                                v-model="userData.username"
                                >
                        <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
        </div>

        <div class="form-group">
                        <label for="password">Password</label>
                        <input
                                type="password"
                                id="password"
                                class="form-control"
                                v-model="userData.password">
                        <!-- <p>{{ userData.password }}</p> -->
        </div>

        <hr>
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3" style="margin-left:140px">
                    <button
                            
                            class="btn btn-primary"
                            @click.prevent="submitted">Login
                             
                    </button>
                    <!-- <input
                        class="btn btn-primary"
                        type="submit"
                        value="Login"
                    > -->

                </div>
            </div>
    </div>
    </form>
    <hr>
        <div class="row" v-if="isSubmitted">

            <div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4>Your Data</h4>
                    </div>
                    <div class="panel-body">
                        <p>Username: {{ userData.username }}</p>
                        <p>Password: {{ userData.password}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    
    
    export default {
        data (){
            return {
                userData: {
                    username: '',
                    password: '',
                    age: 27
                },

                errors: [],
                message: 'A new Text',
                sendMail: [],
                gender: 'Male',
                selectedCity: 'Ho Chi Minh',
                cities: ['Ho Chi Minh', 'Da Nang', 'Ha Noi'],
                isAdmin: false,
                isSubmitted: false,
                isUsernameBlank: false,

                reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
                
            }
        },
        methods: {
            


            submitted(){
                this.isSubmitted = true;
                
                // Call API
                axios({
                method : 'post',
                url : 'http://localhost:3000/signin',
                data:
                {
                    "username": this.userData.username,
                    "password": this.userData.password,
                }
                }).then(res => {
                    console.log(res);
                    localStorage.setItem("token", res.data.token)
                    this.$router.push("/user/"+ res.data.id)
                    this.$alert("Login Successful !");

                }).catch(error => {
                    console.log(error);

                    this.$alert(error.response.data.message);
                });

                //Check Form
                if (!this.userData.user) {
                    this.isUsernameBlank = true;
                }
                if(this.userData.user){
                    this.isUsernameBlank = false;
                }
                

                },

            isEmailValid: function() {
                return (this.email == "")? "" : (this.reg.test(this.email)) ? 'has-success' : 'has-error';
            },

            checkForm: function (e) {
            this.errors = [];

            if (!this.userData.user) {
                this.errors.push("Name required.");
            }
            if (!this.email) {
                this.errors.push('Email required.');
            } else if (!this.validEmail(this.email)) {
                this.errors.push('Valid email required.');
            }

            if (!this.errors.length) {
                return true;
            }

            e.preventDefault();
            },
            validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
            }
            
        },

        mounted: function () {

        },

    }
</script>
<style scoped>
    .form-control{
        width: 30% !important;
    }

</style>
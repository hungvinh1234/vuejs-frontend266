<template>
    <div>
         <ValidationObserver v-slot="{ invalid }">
        <form
            
            action="https://vuejs.org/"
            method="post"
            novalidate="true"
        
        >
            <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
            <li v-for="error in errors" v-bind:key=error>{{ error }}</li>
            </ul>
            </p>

                <div >
                    <h1>Registration</h1>
                    <hr>
                    <div class="form-group">
                        <label for="username">Username</label>
                        <ValidationProvider name="Username" rules="required|alpha_num" v-slot="{ errors }">
                        <input
                                type="text"
                                id="username"
                                class="form-control"
                                v-model="userData.username">
                        <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>

                    <div class="form-group">
                        <label for="password">Password</label>
                        <ValidationProvider name="Password" rules="required|alpha_num" v-slot="{ errors }">
                            <input
                                    type="password"
                                    id="password"
                                    class="form-control"
                                    v-model="userData.password">
                        <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        
                        <ValidationProvider name="Email" rules="required|email" v-slot="{ errors }">
                            <input 
                                rules="'required|email'" 
                                type="text" 
                                name="email"
                                class="form-control"
                                v-model="userData.email">
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>


                    </div>
                    <div class="form-group">
                        <label for="fullname">Full Name</label>
                        <ValidationProvider name="Full Name" rules="required|alpha_spaces" v-slot="{ errors }">
                        <input
                                type="fullname"
                                id="fullname"
                                class="form-control"
                                v-model="userData.fullname">
                        <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="form-group">
                        <label for="birthday">Birthday</label>
                        <datepicker v-model="userData.birthday" id="birthday"></datepicker>
                    </div>
                 <div class="form-group">
                <label for="Gender">Gender</label>                  
                    <div>
                    <label for="male">
                        <input
                                type="radio"
                                id="male"
                                value=1
                                v-model.number="userData.gender"> Male
                    </label>
                    <label for="female">
                        <input
                                type="radio"
                                id="female"
                                value=2
                                v-model.number="userData.gender"> Female
                    </label>
                    </div>
                 </div>
                    <div class="form-group">
                        <label for="address">Address</label>
                        <ValidationProvider name="Address" rules="required" v-slot="{ errors }">
                        <input
                                type="address"
                                id="address"
                                class="form-control"
                                v-model="userData.address">
                        <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="form-group">
                    <label for="city">Hometown</label>
                    <select
                            id="city"
                            class="form-control"
                            v-model="selectedCity">
                        <option 
                            v-for="city in htown" 
                            v-bind:key="city"> {{ city }}</option>
                    </select>
                
                    </div>

                     <div class="form-group">
                    <label for="university">University</label>

                    <select
                            id="city"
                            class="form-control"
                            v-model="selectedUniversity">
                        <option 
                            v-for="university in univer" 
                            v-bind:key="university"> {{ university }}</option>
                    </select>
                
                    </div>

                    <div class="form-group">
                        <label for="">Starting Date</label>
                            <datepicker v-model="userData.startday" id="startday"></datepicker>
                    </div>

                    <div class="form-group">
                        <label for="">Reference User (optional)</label>
                        <input
                                type="refuser"
                                id="refuser"
                                class="form-control"
                                v-model="userData.ref_user">
                    </div>

                    <div class="form-group">
                        
                        <label for="">Is Admin</label>
                            <input type="checkbox" id="admin" v-model="IsAdminChecked">

                 </div>

                </div>
        
            <div class="row">
                <div style="margin-left: 200px;">
                    <input
                            class="btn btn-primary"
                           
                            type="submit"
                            value="Submit"
                            @click.prevent="submitted"

                            :disabled="invalid"
                            >
                        
                </div>
            </div>
        </form>
        </ValidationObserver>
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
                        <p>Email: {{ userData.email }}</p>
                        <p>Fullname: {{ userData.fullname}}</p>
                        <p>Birthday: {{ userData.birthday}}</p>
                        <p>Gender: {{ userData.gender }}</p>
                        <p>Address: {{ userData.address }}</p>
                        <p>City: {{ selectedCity }}</p>
                        <p>Graduated University: {{ selectedUniversity}} </p>
                        <p>Starting Date: {{ userData.startday }}</p>
                        <p>Reference User: {{ userData.ref_user }}</p>
                        <p>Is Admin: {{ IsAdminChecked }}</p>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
     
     import * as VeeValidate from 'vee-validate';
     import { ValidationProvider } from 'vee-validate';
     import Datepicker from 'vuejs-datepicker';
     export default {
        
        components:{
            Datepicker,
            ValidationProvider

        },

        data (){
            return {
               
                univer:[],

                htown: [],

                userData: {
                    username: null,
                    password: null,
                    isAdmin: "false",
                    gender: 1,

                },
                
                errors:[],
                message: 'A new Text',
                sendMail: [],
                

                selectedCity: 'HCM',
                hometown: ['UIT', 'HCMUS', 'USSH','HCMUT'],

                selectedUniversity: 'UIT',
                universities: ['UIT', 'HCMUS', 'USSH','HCMUT'],
                
                isSubmitted: false,
                isUsernameBlank: false,

                reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
                
            }
        },

         mounted() {
            this.LoadHometown();
            this.LoadUniversity();
        },
        methods: {
            
            //gan du lieu tu database
            LoadUniversity(){
                axios({
                    method: "get",
                    url: "http://localhost:3000/university"
                  
                })
                .then(res => {

                    this.univer = res.data;
                    console.log(res);
                    
                    for (var i = 0; i < this.univer.length; i++) {
                        this.univer[i] = this.univer[i].name;
                     
                }

                })
                .catch(error => {
                    console.log(error.response);
                    this.$alert(error.response.data.message);
                });
            },

            LoadHometown(){
                
                axios({
                    method: "get",
                    url: "http://localhost:3000/hometown"
                  
                })
                .then(res => {

                    this.htown = res.data;
                    console.log(res);
                    // this.$alert(htown)
                    for (var i = 0; i < this.htown.length; i++) {
                        this.htown[i] = this.htown[i].city;
                     
                }

                })
                .catch(error => {
                    console.log(error.response);
                    this.$alert(error.response.data.message);
                });

            },
            
            submitted(){

                this.isSubmitted = true;

                axios({
                method : 'post',
                url : 'http://localhost:3000/signup',
                data:
                {
                    "username": this.userData.username,
                    "password": this.userData.password,
                    "email": this.userData.email,
                    "name": this.userData.fullname,
                    "gender": this.userData.gender,
                    "address": this.userData.address,
                    "hometown": this.selectedCity,
                    "university": this.selectedUniversity,
                    "ref_user": this.userData.ref_user,
                    "start_date": this.userData.startday,
                    "birthday": this.userData.birthday,
                    "is_admin": this.IsAdminChecked

                }
                }).then(res => {
                    
                    
                    console.log(res);
                    this.$alert("Account Create Successful !");
                    this.$router.push("/")
                }).catch(error => {
                    console.log(error.response.data.message);
                    this.$alert(error.response.data.message);
                });

            },

            isEmailValid: function() {
                return (this.email == "")? "" : (this.reg.test(this.email)) ? 'has-success' : 'has-error';
            },
        },
     }
</script>

<style lang="stylus" scoped>
span {
  display: block;
}
.form-control{
        width: 40% !important;
    }

</style>
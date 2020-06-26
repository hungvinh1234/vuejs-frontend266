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

            <!-- <div class="row"> -->
                <div v-if="response">
                    <h1>Edit User</h1>
                    <hr>
                    <div class="form-group">
                        <label for="username">Username</label>
                        <ValidationProvider name="Username" rules="alpha_num" v-slot="{ errors }">
                        <input
                                type="text"
                                id="username"
                                class="form-control"
                                v-model="userData.username"
                                :placeholder="response.data.username"
                                
                                >
                        <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>

                    <div class="form-group">
                        <label for="password">Password</label>
                        <ValidationProvider name="Password" rules="alpha_num" v-slot="{ errors }">
                            <input
                                    type="password"
                                    id="password"
                                    class="form-control"
                                    v-model="userData.password"
                                    placeholder="Input if you want to change your password">
                        <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
    
                        <ValidationProvider name="Email" rules="email" v-slot="{ errors }">
                            <input 
                                rules="'email'" 
                                type="text" 
                                name="email"
                                class="form-control"
                                v-model="userData.email"
                                :placeholder="response.data.email"
                                >
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>


                    </div>
                    <div class="form-group">
                        <label for="fullname">Full Name</label>
                        <ValidationProvider name="Full Name" rules="alpha_spaces" v-slot="{ errors }">
                        <input
                                type="fullname"
                                id="fullname"
                                class="form-control"
                                v-model="userData.fullname"
                                :placeholder="response.data.name">
                        <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="form-group">
                        <label for="birthday">Birthday</label>
                        <datepicker v-if="response" v-model="userData.birthday" id="birthday"
                        :placeholder="response.data.birthday"
                        ></datepicker>
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
                        <ValidationProvider name="Address" rules="" v-slot="{ errors }">
                        <input
                                type="address"
                                id="address"
                                class="form-control"
                                v-model="userData.address"
                                :placeholder="response.data.address">
                        <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>

                     <div class="form-group">
                    <label for="hometown">Hometown</label>
                    <select
                            id="city"
                            class="form-control"
                            v-model="userData.hometown"
                            >
                        <option 
                            v-for="city in hometown" 
                            v-bind:key="city"> {{ city }}</option>
                    </select>
                
                    </div>
                    
                     <div class="form-group">
                    <label for="university">University</label>
                    <select
                            id="city"
                            class="form-control"
                            v-model="userData.university"
                            value="city ne">
                        <option 
                            v-for="university in universities" 
                            v-bind:key="university"> {{ university }}</option>
                    </select>
                
                    </div>

                    <div class="form-group">
                        <label for="startday">Start Date</label>
                        <datepicker v-if="response" v-model="userData.startday" id="startday"
                        :placeholder="response.data.start_date"
                        ></datepicker>
                    </div>

                    <div class="form-group">
                        
                        <label for="">Is Admin</label>
                            <input type="checkbox" id="admin" v-model="IsAdminChecked">

                 </div>

                </div>
            
            <hr>
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <input
                            class="btn btn-primary"
                           
                            type="submit"
                            value="Update"
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
     import moment from "moment";
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
                
                response:"",
                userData: {
                    username: null,
                    password: null,
                    isAdmin: "false",
                    gender: null

                },
                errors:[],
                message: 'A new Text',
                sendMail: [],
                

                selectedCity: 'Ho Chi Minh',
                hometown: ['Ho Chi Minh', 'Da Nang', 'Ha Noi'],

                selectedUniversity: 'UIT',
                universities: ['UIT', 'HCMUS', 'USSH','HCMUT'],
                
                isSubmitted: false,
                
            }
        },

         mounted() {
    
            this.LoadData();
        
        },

        methods: {

            LoadData() {
                let storedToken = localStorage.getItem("token")

                axios({
                    method: "post",
                    url: `http://localhost:3000/account/${this.$route.params.id}`,
                    headers: {
                        'Authorization': `Bearer ${storedToken}`
                    }
                })
                    .then(res => {
                    this.response = res;

                    // Gan value cua form edit
                    this.userData.username = this.response.data.username;
                    this.userData.password = this.response.data.password;
                    this.userData.email = this.response.data.email;
                    this.userData.fullname = this.response.data.name;
                    this.userData.birthday = this.response.data.birthday;
                    this.userData.gender = this.response.data.gender;
                    this.userData.address = this.response.data.address;
                    this.userData.hometown = this.response.data.hometown;
                    this.userData.university = this.response.data.university;
                    this.userData.startday = this.response.data.start_date;
                    this.userData.ref_user = this.response.data.ref_user;
                    this.IsAdminChecked = this.response.data.is_admin;



                    console.log(this.response);
                    })
                    .catch(error => {
                    console.log("bi loi");
                    this.$alert("bi loi "+ error.response);
                    });
    },

            submitted(){
                this.isSubmitted = true;
                let storedToken = localStorage.getItem("token")
                axios({
                method : 'put',
                url: `http://localhost:3000/account/${this.$route.params.id}/edit`,
                headers: {
                        'Authorization': `Bearer ${storedToken}`
                    },
                data:
                {
                    "username": this.userData.username,
                    "password": this.userData.password,
                    "email": this.userData.email,
                    "name": this.userData.fullname,
                    "gender": this.userData.gender,
                    "address": this.userData.address,
                    "hometown": this.userData.hometown,
                    "university": this.userData.university,
                    "ref_user": this.userData.ref_user,
                    "start_date": this.userData.startday,
                    "birthday": this.userData.birthday,
                    "is_admin": this.IsAdminChecked

                }
                }).then(res => {
                    
                    
                    console.log(res);
                    this.$alert("Update Account Successful !");
                    this.$router.push("/user/"+ res.data.id)

                    
                }).catch(error => {
                    console.log(error.response.data.message);
                    this.$alert(error.response.data.message);
                });

            },

            isEmailValid: function() {
                return (this.email == "")? "" : (this.reg.test(this.email)) ? 'has-success' : 'has-error';
            },

              format_date(value) {
                if (value) {
                return moment(String(value)).format("DD-MM-YYYY");
            }
         }
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
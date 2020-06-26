<template>
  <div>
    <b-table
      bordered
      striped
      hover
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      v-model="shownItems"
      @row-clicked="myRowClickHandler"
    ></b-table>

    <input
      class="btn btn-primary"
      type="submit"
      value="Add"
      @click.prevent="mdAddSubmitted"
      :disabled="invalid"
    />

    <modal name="modal-add" width="850" height="650" :resizable="true">
      <div>
        <ValidationObserver v-slot="{ invalid }">
          <form action="https://vuejs.org/" method="post" novalidate="true">
            <div v-if="response" style="margin-top: 20px">
              <div class="form-group1">
                <label for="username">Username</label>
                <ValidationProvider name="Username" rules="required|alpha_num" v-slot="{ errors }">
                  <input
                    type="text"
                    id="username"
                    class="form-control1"
                    v-model="userData.usernameAdd"
                  />
                  <span style="color:red">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="form-group1">
                <label for="password">Password</label>
                <ValidationProvider name="Password" rules="required|alpha_num" v-slot="{ errors }">
                  <input
                    type="password"
                    id="password"
                    class="form-control1"
                    v-model="userData.passwordAdd"
                  />
                  <span style="color:red">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group1">
                <label for="email">Email</label>

                <ValidationProvider
                  name="Email"
                  rules="required|email"
                  v-slot="{ errors }"
                  style="margin-left:30px"
                >
                  <input
                    rules="'email'"
                    type="text"
                    name="email"
                    class="form-control1"
                    v-model="userData.emailAdd"
                  />
                  <span style="color:red">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group1">
                <label for="fullname">Full Name</label>
                <ValidationProvider
                  name="Full Name"
                  rules="required|alpha_spaces"
                  v-slot="{ errors }"
                >
                  <input
                    type="fullname"
                    id="fullname"
                    class="form-control1"
                    v-model="userData.fullnameAdd"
                  />
                  <span style="color:red">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group1">
                <label for="birthday">Birthday</label>
                <datepicker
                  v-if="response"
                  v-model="userData.birthdayAdd"
                  id="birthday"
                  style="display:inline-flex; margin-left: 40px"
                ></datepicker>
              </div>
              <div class="form-group1">
                <label for="Gender">Gender</label>
                <div style="display:inline-flex; margin-left: 50px">
                  <label for="male">
                    <input type="radio" id="male" value="1" v-model.number="userData.genderAdd" /> Male
                  </label>
                  <label for="female">
                    <input
                      type="radio"
                      id="female"
                      value="2"
                      v-model.number="userData.genderAdd"
                      style="margin-left: 50px"
                    /> Female
                  </label>
                </div>
              </div>
              <div class="form-group1">
                <label for="address">Address</label>
                <ValidationProvider
                  name="Address"
                  rules
                  v-slot="{ errors }"
                  style="margin-left:10px"
                >
                  <input
                    type="address"
                    id="address"
                    class="form-control1"
                    v-model="userData.addressAdd"
                  />
                  <span style="color:red">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="form-group1">
                <label for="hometown">Hometown</label>
                <select
                  id="hometown"
                  class="form-control1"
                  v-model="userData.hometownAdd"
                  style="margin-left:25px"
                >
                  <option v-for="city in htown" v-bind:key="city">{{ city }}</option>
                </select>
              </div>

              <div class="form-group1">
                <label for="university">University</label>
                <select id="university" class="form-control1" v-model="userData.universityAdd">
                  <option v-for="university in univer" v-bind:key="university">{{ university }}</option>
                </select>
              </div>

              <div class="form-group1">
                <label for="startday">Start Date</label>
                <datepicker
                  v-if="response"
                  v-model="userData.startdayAdd"
                  id="startday"
                  style="display:inline-flex; margin-left: 35px"
                ></datepicker>
              </div>

              <div class="form-group1">
                <label for>Reference User</label>
                <input
                  type="refuser"
                  id="refuser"
                  class="form-control1"
                  v-model="userData.ref_userAdd"
                  style="display:inline-flex; margin-left: 0px"
                />
              </div>

              <div class="form-group1">
                <label for>Is Admin</label>
                <input
                  type="checkbox"
                  id="admin"
                  v-model="IsAdminCheckedAdd"
                  style="display:inline-flex; margin-left:45px"
                />
              </div>
            </div>

            <div class="row">
              <div class="form-group1">
                <input
                  class="btn btn-primary"
                  type="submit"
                  value="Create"
                  @click.prevent="AddAccount"
                  :disabled="invalid"
                  style="margin-left:150px!important"
                />
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </modal>

    <modal name="modal-detail" width="850" height="650" :resizable="true">
      <div v-if="response">
        <div class="panel panel-default">
          <div class="panel-heading" style="background-color: white;">
            <h4>User Detail</h4>
            <button
              class="btn btn-primary"
              @click.prevent="mdRefSubmitted"
              style="margin-left: 0px"
            >Reference List</button>
          </div>

          <div v-if="response" class="panel-body">
            <p>Username: {{ response.data.username }}</p>
            <p>Email: {{ response.data.email }}</p>
            <p>Fullname: {{ response.data.name}}</p>
            <p>Birthday: {{ response.data.birthday}}</p>
            <p>Gender: {{ response.data.gender }}</p>
            <p>Address: {{ response.data.address }}</p>
            <p>City: {{ response.data.hometown }}</p>
            <p>Graduated University: {{ response.data.university}}</p>
            <p>Starting Date: {{ response.data.start_date }}</p>
            <p>Reference User: {{response.data.ref_user }}</p>
            <p>Is Admin: {{ response.data.is_admin }}</p>
          </div>
        </div>
        <div>
          <div>
            <ul class="nav nav-pills">
              <button
                class="btn btn-primary"
                @click.prevent="mdDetailSubmitted"
                style="margin-left: 30px"
              >Edit</button>
              <button
                class="btn btn-primary"
                @click.prevent="mdDetailDelete"
                style="margin-left: 10px"
              >Delete</button>
              <vue-confirm-dialog></vue-confirm-dialog>
            </ul>
          </div>
        </div>
      </div>
    </modal>

    <modal name="modal-reflist" width="1050" height="650" :resizable="true">
      <h4 style="margin-left: 10px">Reference List</h4>

      <b-table
        bordered
        striped
        hover
        :items="refitems"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        v-model="shownItems"
        @row-clicked="myRowClickHandler"
      ></b-table>
    </modal>

    <modal name="modal-edit" width="850" height="650" :resizable="true">
      <div>
        <ValidationObserver v-slot="{ invalid }">
          <form action="https://vuejs.org/" method="post" novalidate="true">
            <div v-if="response" style="margin-top: 20px">
              <div class="form-group1">
                <label for="username">Username</label>
                <ValidationProvider name="Username" rules="alpha_num" v-slot="{ errors }">
                  <input
                    type="text"
                    id="username"
                    class="form-control1"
                    v-model="userData.username"
                    :placeholder="response.data.username"
                  />
                  <span style="color:red">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="form-group1">
                <label for="password">Password</label>
                <ValidationProvider name="Password" rules="alpha_num" v-slot="{ errors }">
                  <input
                    type="password"
                    id="password"
                    class="form-control1"
                    v-model="userData.password"
                    placeholder="*******"
                  />
                  <span style="color:red">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group1">
                <label for="email">Email</label>

                <ValidationProvider
                  name="Email"
                  rules="email"
                  v-slot="{ errors }"
                  style="margin-left:30px"
                >
                  <input
                    rules="'email'"
                    type="text"
                    name="email"
                    class="form-control1"
                    v-model="userData.email"
                    :placeholder="response.data.email"
                  />
                  <span style="color:red">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group1">
                <label for="fullname">Full Name</label>
                <ValidationProvider name="Full Name" rules="alpha_spaces" v-slot="{ errors }">
                  <input
                    type="fullname"
                    id="fullname"
                    class="form-control1"
                    v-model="userData.fullname"
                    :placeholder="response.data.name"
                  />
                  <span style="color:red">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group1">
                <label for="birthday">Birthday</label>
                <datepicker
                  v-if="response"
                  v-model="userData.birthday"
                  id="birthday"
                  :placeholder="response.data.birthday"
                  style="display:inline-flex; margin-left: 40px"
                ></datepicker>
              </div>
              <div class="form-group1">
                <label for="Gender">Gender</label>
                <div style="display:inline-flex; margin-left: 50px">
                  <label for="male">
                    <input type="radio" id="male" value="1" v-model.number="userData.gender" /> Male
                  </label>
                  <label for="female">
                    <input
                      type="radio"
                      id="female"
                      value="2"
                      v-model.number="userData.gender"
                      style="margin-left: 50px"
                    /> Female
                  </label>
                </div>
              </div>
              <div class="form-group1">
                <label for="address">Address</label>
                <ValidationProvider
                  name="Address"
                  rules
                  v-slot="{ errors }"
                  style="margin-left:10px"
                >
                  <input
                    type="address"
                    id="address"
                    class="form-control1"
                    v-model="userData.address"
                    :placeholder="response.data.address"
                  />
                  <span style="color:red">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="form-group1">
                <label for="hometown">Hometown</label>
                <select
                  id="city"
                  class="form-control1"
                  v-model="userData.hometown"
                  style="margin-left:25px"
                >
                  <option v-for="city in htown" v-bind:key="city">{{ city }}</option>
                </select>
              </div>

              <div class="form-group1">
                <label for="university">University</label>
                <select
                  id="city"
                  class="form-control1"
                  v-model="userData.university"
                  value="city ne"
                >
                  <option v-for="university in univer" v-bind:key="university">{{ university }}</option>
                </select>
              </div>

              <div class="form-group1">
                <label for="startday">Start Date</label>
                <datepicker
                  v-if="response"
                  v-model="userData.startday"
                  id="startday"
                  :placeholder="response.data.start_date"
                  style="display:inline-flex; margin-left: 35px"
                ></datepicker>
              </div>

              <div class="form-group1">
                <label for>Reference User</label>
                <input
                  type="refuser"
                  id="refuser"
                  class="form-control1"
                  v-model="userData.ref_user"
                  :placeholder="response.data.ref_user"
                  style="display:inline-flex; margin-left: 0px"
                />
              </div>

              <div class="form-group1">
                <label for>Is Admin</label>
                <input
                  type="checkbox"
                  id="admin"
                  v-model="IsAdminChecked"
                  style="display:inline-flex; margin-left:45px"
                />
              </div>
            </div>

            <div class="row">
              <div class="form-group1">
                <input
                  class="btn btn-primary"
                  type="submit"
                  value="Update"
                  @click.prevent="mdEditSubmitted"
                  :disabled="invalid"
                  style="margin-left:150px!important"
                />
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </modal>
  </div>
</template>

<script>
import moment from "moment";
import * as VeeValidate from "vee-validate";
import { ValidationProvider } from "vee-validate";
import Datepicker from "vuejs-datepicker";
import ModalUserDetail from "./ModalUserDetail.vue";

export default {
  components: {
    Datepicker,
    ValidationProvider
  },

  data() {
    return {
      response: "",
      userData: {
        username: null,
        password: null,
        isAdmin: "false",
        gender: null
      },
      errors: [],
      message: "A new Text",
      sendMail: [],

      selectedCity: 'HCM',

      selectedUniversity: 'UIT',

      isSubmitted: false,

      fields: [
        "username",
        "email",
        "name",
        "birthday",
        "gender",
        "address",
        "hometown",
        "university",
        "ref_user",
        "start_date"
      ],

      items: [],
      refitems: [],

      response: "",
      recorded: "",
      link: {
        name: "userList",
        params: {
          id: this.$route.params.id
        },
        query: {
          locale: "en",
          q: 100
        },
        hash: "#data"
      }
    };
  },

  mounted: function() {
    this.LoadList();
  },

  methods: {
    //gan du lieu tu database
    LoadUniversity() {
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

    LoadHometown() {
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

    LoadList() {
      let storedToken = localStorage.getItem("token");

      axios({
        method: "post",
        url: "http://localhost:3000/account/userlist",
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      })
        .then(res => {
          this.response = res;
          this.items = res.data;

          for (var i = 0; i < this.items.length; i++) {
            this.items[i].birthday = this.format_date(this.items[i].birthday);
            this.items[i].start_date = this.format_date(
              this.items[i].start_date
            );
          }
        })
        .catch(error => {
          console.log(error.response);
          this.$alert(error.response.data.message);
        });
    },

    ResetAddModal() {
      this.userData.usernameAdd = "";
      this.userData.passwordAdd = "";
      this.userData.emailAdd = "";
      this.userData.fullnameAdd = "";
      this.userData.genderAdd = "";
      this.userData.addressAdd = "";
      this.selectedCityAdd = "";
      this.selectedUniversityAdd = "";
      this.userData.ref_userAdd = "";
      this.userData.startdayAdd = "";
      this.userData.birthdayAdd = "";
      this.IsAdminCheckedAdd = false;
    },

    AddAccount() {
      axios({
        method: "post",
        url: "http://localhost:3000/signup",
        data: {
          username: this.userData.usernameAdd,
          password: this.userData.passwordAdd,
          email: this.userData.emailAdd,
          name: this.userData.fullnameAdd,
          gender: this.userData.genderAdd,
          address: this.userData.addressAdd,
          hometown: this.userData.hometownAdd,
          university: this.userData.universityAdd,
          ref_user: this.userData.ref_userAdd,
          start_date: this.userData.startdayAdd,
          birthday: this.userData.birthdayAdd,
          is_admin: this.IsAdminCheckedAdd
        }
      })
        .then(res => {
          console.log(res);
          this.$alert("Account Create Successful !");
          // this.$router.push("/");
          this.$router.go();
          this.hideModalAdd();
        })
        .catch(error => {
          console.log(error.response.data.message);
          this.$alert(error.response.data.message);
        });
    },

    LoadUser() {
      this.storedToken = localStorage.getItem("token");

      axios({
        method: "post",
        url: `http://localhost:3000/account/${this.recorded.id}`,
        headers: {
          Authorization: `Bearer ${this.storedToken}`
        }
      })
        .then(res => {
          this.response = res;

          this.response.data.birthday = this.format_date(
            this.response.data.birthday
          );

          this.response.data.start_date = this.format_date(
            this.response.data.start_date
          );

          console.log(this.response);
        })
        .catch(error => {
          console.log(error.response);
          this.$alert(error.response);
        });
    },

    LoadData() {
      let storedToken = localStorage.getItem("token");

      axios({
        method: "post",
        url: `http://localhost:3000/account/${this.recorded.id}`,
        headers: {
          Authorization: `Bearer ${storedToken}`
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
          this.$alert("bi loi " + error.response);
        });
    },

    showModalAdd() {
      this.$modal.show("modal-add");
    },

    hideModalAdd() {
      this.$modal.hide("modal-add");
    },

    showModalRef() {
      this.$modal.show("modal-reflist");
    },

    hideModalEdit() {
      this.$modal.hide("modal-reflist");
    },

    showModalEdit() {
      this.$modal.show("modal-edit");
    },
    hideModalEdit() {
      this.$modal.hide("modal-edit");
    },

    showModalDetail() {
      this.$modal.show("modal-detail");
    },

    hideModalDetail() {
      this.$modal.hide("modal-detail");
    },

    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD-MM-YYYY");
      }
    },

    mdAddSubmitted() {
      this.ResetAddModal();
      this.LoadHometown();
      this.LoadUniversity();
      this.showModalAdd();
    },

    mdRefSubmitted() {
      this.showModalRef();

      let storedToken = localStorage.getItem("token");
      axios({
        method: "get",
        url: `http://localhost:3000/account/${this.recorded.id}/reflist`,
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      })
        .then(res => {
          console.log(res);
          this.refitems = res.data;

          for (var i = 0; i < this.refitems.length; i++) {
            this.refitems[i].birthday = this.format_date(
              this.refitems[i].birthday
            );
            this.refitems[i].start_date = this.format_date(
              this.refitems[i].start_date
            );
          }
        })
        .catch(error => {
          console.log(error.response.data.message);
          this.$alert(error.response.data.message);
        });
    },

    mdDetailSubmitted() {
      this.LoadData();
      this.LoadHometown();
      this.LoadUniversity();
      this.showModalEdit();
    },

    mdDetailDelete() {
      this.$confirm({
        message: `This account will be permanently delete. Are you sure?`,
        button: {
          no: "No",
          yes: "Yes"
        },
        /**
         * Callback Function
         * @param {Boolean} confirm
         */
        callback: confirm => {
          if (confirm) {
            // ... do something

            let storedToken = localStorage.getItem("token");
            axios({
              method: "delete",
              url: `http://localhost:3000/account/${this.recorded.id}`,
              headers: {
                Authorization: `Bearer ${storedToken}`
              }
            })
              .then(res => {
                console.log(res);
                this.$alert("Delete Account Successful !");
                // this.$router.push("/user/");
                this.$router.go();
                this.hideModalDetail();
              })
              .catch(error => {
                console.log(error.response.data.message);
                this.$alert(error.response.data.message);
              });
          }
        }
      });
    },

    mdEditSubmitted() {
      this.isSubmitted = true;
      let storedToken = localStorage.getItem("token");
      axios({
        method: "put",
        url: `http://localhost:3000/account/${this.recorded.id}/edit`,
        headers: {
          Authorization: `Bearer ${storedToken}`
        },
        data: {
          username: this.userData.username,
          password: this.userData.password,
          email: this.userData.email,
          name: this.userData.fullname,
          gender: this.userData.gender,
          address: this.userData.address,
          hometown: this.userData.hometown,
          university: this.userData.university,
          ref_user: this.userData.ref_user,
          start_date: this.userData.startday,
          birthday: this.userData.birthday,
          is_admin: this.IsAdminChecked
        }
      })
        .then(res => {
          console.log(res);
          this.$alert("Update Account Successful !");
          this.$router.go();
          // this.$router.push("/user/");
          this.hideModalEdit();
        })
        .catch(error => {
          console.log(error.response.data.message);
          this.$alert(error.response.data.message);
        });
    },

    myRowClickHandler(record, index) {
      // 'record' will be the row data from items
      // `index` will be the visible row number (available in the v-model 'shownItems')
      console.log(record); // This will be the item data for the row
      this.recorded = record;
      // this.$router.push("/user/" + record.id);
      // this.$alert(this.recorded.id)
      this.showModalDetail();
      this.LoadUser();
    }
  }
};
</script>

<style lang="stylus">
.form-group {
}

.form-control {
}

.form-control1 {
  margin-left: 30px;
  width: 50% !important;
  display: inline-flex !important;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}

.form-group1 {
  padding-top: 15px;
  margin-left: 200px !important;
  width: 50% !important;
}
</style>
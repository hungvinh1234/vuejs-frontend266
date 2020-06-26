<template>
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
</template>
<script>
import * as VeeValidate from "vee-validate";
import { ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationProvider
  },

  response: "",

  methods: {
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

    mdDetailSubmitted() {
      this.LoadData();
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

  }
};
</script>
<style lang="stylus" scoped></style>
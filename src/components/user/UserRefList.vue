<template>
  <div>
  <h4>Reference User List</h4>
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
  ></b-table>
  </div>
</template>

<script>
import moment from "moment";


export default {

  data() {
    return {
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
      refitems: []
    };
  },

  mounted: function(){

      this.LoadRefList();

  },

  methods: {
    LoadRefList() {
      let storedToken = localStorage.getItem("token");
      axios({
        method: "get",
        url: `http://localhost:3000/account/${this.$route.params.id}/reflist`,
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

    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD-MM-YYYY");
      }
    },

  }
};
</script>
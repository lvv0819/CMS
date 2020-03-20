<template>
  <div>
    <span>专业选择：</span>
    <select @change='selectOption("categoryOne")' v-model="categorySelect.categoryOne">
      <option v-for="data in categoryOne" :value="data.sysId">{{data.title}}</option>
    </select>

    <select @change='selectOption("categoryTwo")' v-model="categorySelect.categoryTwo">
      <option v-for="data in categoryTwo" :value="data.sysId">{{data.title}}</option>
    </select>

    <select @change='selectOption()' v-model="categorySelect.categoryThree">
      <option v-for="data in categoryThree" :value="data.sysId">{{data.title}}</option>
    </select>
  </div>
</template>
<script>
  export default {
    props: ['categoryData'],
    data() {
      return {
        category: [],
        categoryOne: [],
        categoryTwo: [],
        categoryThree: [],
      categorySelect: { // 選中的權限數據
        categoryOne:  "",
        categoryTwo:  "",
        categoryThree:  ""
      }
    };
  },
  methods: {
    selectOption: function(categoryType) {
      //  给父级传递数据
      this.$emit('categoryData',this.categorySelect)
      // 给下个选择框设置内容
      let sysId = this.categorySelect[categoryType] || 0;
      let category = "";
      switch (categoryType) {
        case "categyorZero":
        this.categoryOne = [];
        this.categoryTwo = [];
        this.categoryThree = [];
        category = "categoryOne";
        break;
        case "categoryOne":
        this.categoryTwo = [];
        this.categoryThree = [];
        category = "categoryTwo";
        break;
        case "categoryTwo":
        this.categoryThree = [];
        category = "categoryThree";
        break;
      }
      if(category){
        for (let i = 0; i < this.category.length; i++) {
          if (this.category[i].fatherId == sysId) {
            this[category].push(this.category[i]);
          }
        }
      }
    }
  },
  created: function() {
    this.$axios({
      method: "get",
      url: "/VueHandler/CourseHandler?action=getcategory"
    })
    .then(res => {
      if (res.data.success) {
        this.category = res.data.data;
        this.selectOption('categyorZero');
      } else {
        alert(res.data.err);
      }
    })
    .catch(err => {
      alert(err);
    });
  },
  watch:{ // 监听数据的变化
    categoryData:{
      handler:function(val,oldVal){
        this.categorySelect = { // 選中的權限數據
          categoryOne:  val.one,
          categoryTwo: val.two,
          categoryThree:  val.three
        };
        if(this.categorySelect.categoryOne){
          this.selectOption('categoryOne');
        }
        if(this.categorySelect.categoryTwo){
         this.selectOption('categoryTwo');
       }
     },
     deep:true
   }
 }




};
</script>

<style scoped="">
  select {
    width: 208px;
    height: 30px;
  }
</style>
<template>
  <div>
      <Home>首页</Home>
      <div class="content">
        <Loading v-if="loading"></Loading>
        <template v-else>
          <Swiper :slidesdata='slidesdata'></Swiper>
          <div class="hotbook">
            <h3>热门图书</h3>
            <ul>
              <li v-for="(book,index) in books" :key="index">
                <img :src="book.bookCover" alt="">
                <p>{{book.bookName}}{{book.bookId}}</p>
              </li>
            </ul>
          </div>
        </template>
      </div>
  </div>
</template>
<script>
import Home from "../base/MHeader.vue";
import Swiper from "../base/Swiper.vue";
import Loading from "../base/Loading.vue";
import { getAll } from "../api";
export default {
  data() {
    return {
      slidesdata: [],
      books: [],
      loading: true
    };
  },
  methods: {
    // getSlide() {
    //   slides().then(res => {
    //     this.slidesdata = res;
    //   });
    // },
    // getBook() {
    //   getBooks().then(res => {
    //     this.books = res;
    //   });
    // }
    async getData() {
      let [slides, getBooks] = await getAll();
      this.slidesdata = slides;
      this.books = getBooks;
      //。。。轮播图和热门图书已经获取完成
      this.loading = false;
    }
  },
  computed: {},
  components: {
    Home,
    Swiper,
    Loading
  },
  created() {
    this.getData();
  }
};
</script>
<style lang="less" scoped>
.hotbook {
  width: 90%;
  margin: 0 auto;
  padding-bottom: 20px;
  h3 {
    padding: 10px 0;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 50%;
      img {
        width: 100%;
      }
      p {
        text-align: center;
      }
    }
  }
}
</style>




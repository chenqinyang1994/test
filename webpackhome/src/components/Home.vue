<template>
  <div>
      <Home>首页</Home>
      <div class="content">
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
      </div>
  </div>
</template>
<script>
import Home from "../base/MHeader.vue";
import Swiper from "../base/Swiper.vue";
import { slides, getBooks } from "../api";
export default {
  data() {
    return {
      slidesdata: [],
      books: []
    };
  },
  methods: {
    getSlide() {
      slides().then(res => {
        this.slidesdata = res;
      });
    },
    getBook() {
      getBooks().then(res => {
        this.books = res;
      });
    }
  },
  computed: {},
  components: {
    Home,
    Swiper
  },
  created() {
    this.getSlide();
    this.getBook();
  }
};
</script>
<style lang="less" scoped>
.hotbook {
  width: 90%;
  margin: 0 auto;
  padding-bottom: 20px;
  h3{
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




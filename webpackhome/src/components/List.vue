<template>
  <div>
    <MHeader>列表页</MHeader>
    <div class="content" ref="scroll" @scroll="conScroll">
      <ul>
        <router-link v-for="(book,index) in allBooks" :key="index" :to="{name:'detail',params:{bid:book.bookId}}" tag='li'>
          <img v-lazy="book.bookCover" alt="">
          <div>
            <h4>{{book.bookName}}</h4>
            <p>{{book.bookInfo}}</p>
            <b>{{book.bookPrice}}</b>
            <p>{{book.bookId}}</p>
          </div>
          <button @click.stop="remove(book.bookId)">删除</button>
        </router-link>
      </ul>
      <div class="more" v-if="!hasMore">不要再滑了，到底了</div>
    </div>
  </div>
</template>
<script>
import MHeader from "../base/MHeader.vue";
import { pagination, removeBook } from "../api";
export default {
  data() {
    return {
      allBooks: [],
      hasMore: true,
      offset: 0,
      loading: false
    };
  },
  methods: {
    conScroll() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        let { scrollTop, clientHeight, scrollHeight } = this.$refs.scroll;
        console.dir(this.$refs.scroll)
        if (scrollTop + clientHeight + 20 >= scrollHeight) {
          this.page();
        }
      }, 60);
    },
    page() {
      if (this.hasMore && !this.loading) {
        this.loading = true;
        pagination(this.offset).then(res => {
          let { hasMore, books } = res;
          this.allBooks = [...this.allBooks, ...books];
          this.hasMore = hasMore;
          this.offset = this.allBooks.length;
          this.loading = false;
        });
      }
    },
    remove(id) {
      removeBook(id).then(res => {
        this.allBooks = this.allBooks.filter(item => item.bookId != id);
      });
    }
  },
  mounted() {
    // let dom = this.$refs.scroll;
    // let dissss = 0,
    //   start,
    //   moveEv,
    //   endEv;
    // dom.addEventListener("touchstart", e => {
    //   start = e.touches[0].pageY;
    // });
    // dom.addEventListener("touchmove", e => {
    //   dissss = e.touches[0].pageY - start;
    //   if (dissss > 0 && dissss < 51) {
    //     dom.style.top = dissss + 40 + "px";
    //   }
    // });
    // dom.addEventListener("touchend", e => {});
  },
  computed: {},
  components: {
    MHeader
  },
  created() {
    this.page();
  }
};
</script>
<style lang="less" scoped>
.content {
  ul {
    padding: 10px;
    li {
      display: flex;
      padding: 5px 0;
      border-bottom: 1px solid #ccc;
      img {
        width: 33%;
        height: 55%;
      }
      div {
        padding-right: 12px;
        h4 {
          font-size: 24px;
          line-height: 35px;
        }
        p {
          font-size: 16px;
          line-height: 30px;
          color: #2e2e2e;
        }
        b {
          color: red;
          line-height: 30px;
        }
      }
      button {
        display: block;
        width: 25px;
        background-color: orangered;
        color: #fff;
        border: none;
        border-radius: 10px;
        outline: none;
      }
    }
  }
  .more {
    margin: 10px;
    padding: 5px 0;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 20px;
    background-color: lightgreen;
  }
}
</style>




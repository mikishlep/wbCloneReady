<template>
  <div class="rating-tag" :style="getRatingStyle(rating)">
    {{ rating }}
  </div>
</template>

<script>
export default {
  name: 'ProductRating',
  props: {
    rating: {
      type: [String, Number],
      required: true
    }
  },
  methods: {
    getRatingStyle(rating) {
      const numericRating = parseFloat(rating);
      if (numericRating === 10) {
        return {
          backgroundColor: '#f7f7fa',
          color: '#067b00'
        };
      } else if (numericRating > 7 && numericRating < 10) {
        return { backgroundColor: '#ff8058' };
      } else {
        return { backgroundColor: '#f96666' };
      }
    }
  }
}
</script>

<style scoped>
.rating-tag {
  align-items: center;
  border-radius: 6px;
  display: inline-block;
  font-family: lato, arial, sans-serif;
  font-size: 13px;
  font-weight: 550;
  height: 24px;
  line-height: 16px;
  padding: 4px 8px;
  background-color: #ff8058;
  color: #fff;
}
</style>

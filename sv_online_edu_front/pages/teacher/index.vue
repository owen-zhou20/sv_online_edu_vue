<template>
  <div id="aCoursesList"
       class="bg-fa of">
    <!-- Teacher list start -->
    <section class="container">
      <header class="comm-title all-teacher-title">
        <h2 class="fl tac">
          <span class="c-333">All teachers</span>
        </h2>
        <section class="c-tab-title">
          <a id="subjectAll"
             title="All"
             href="#">All</a>
          <!-- <c:forEach var="subject" items="${subjectList }">
            <a id="${subject.subjectId}"
              title="${subject.subjectName }" href="javascript:void(0)"
              onclick="submitForm(${subject.subjectId})">${subject.subjectName }</a>
          </c:forEach>-->
        </section>
      </header>
      <section class="c-sort-box unBr">
        <div>
          <!-- /No data notice start-->
          <section class="no-data-wrap"
                   v-if="data.total==0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">No data, still working on it...</span>
          </section>
          <!-- /No data notice end-->
          <article class="i-teacher-list"
                   v-if="data.total>0">
            <ul class="of">
              <li v-for="teacher in data.items"
                  :key="teacher.id" height="300px" >
                <section class="i-teach-wrap">
                  <div class="i-teach-pic">
                    <a :href="'/teacher/'+teacher.id"
                       :title="teacher.name"
                       target="_blank">
                      <img height="200px"
                           :src="teacher.avatar"
                           :alt="teacher.name">
                    </a>
                  </div>
                  <div class="mt10 hLh30 txtOf tac">
                    <a :href="'/teacher/'+teacher.id"
                       :title="teacher.name"
                       target="_blank"
                       class="fsize18 c-666">{{teacher.name}}</a>
                  </div>
                  <div class="hLh30 txtOf tac">
                    <span class="fsize14 c-999">{{teacher.intro}}</span>
                  </div>
                  <div class="mt15 i-q-txt">
                    <p class="c-999 f-fA">{{teacher.career}}</p>
                  </div>
                </section>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- Pagetion start -->
        <div>
          <div class="paging">
            <!-- undisable base on hasPrevious -->
            <a :class="{undisable: !data.hasPrevious}"
               href="#"
               title="FirstPage"
               @click.prevent="gotoPage(1)">First</a>
            <a :class="{undisable: !data.hasPrevious}"
               href="#"
               title="previous"
               @click.prevent="gotoPage(data.current-1)">&lt;</a>
            <a v-for="page in data.pages"
               :key="page"
               :class="{current: data.current == page, undisable: data.current == page}"
               :title="'Go to'+page"
               href="#"
               @click.prevent="gotoPage(page)">{{ page }}</a>
            <a :class="{undisable: !data.hasNext}"
               href="#"
               title="next"
               @click.prevent="gotoPage(data.current+1)">&gt;</a>
            <a :class="{undisable: !data.hasNext}"
               href="#"
               title="LastPage"
               @click.prevent="gotoPage(data.pages)">Last</a>
            <div class="clear" />
          </div>
        </div>
        <!-- Pagetion end -->
      </section>
    </section>
    <!-- /Teacher list end -->
  </div>
</template>
<script>
import teacherApi from '@/api/teacher'

export default {
  // asynchronous call, only call once
  // params.id = this.$route.params.id
  asyncData({ params, error }) {
    return teacherApi.getTeacherList(1, 8)
      .then(response => {
        return { data: response.data.data }
      })
  },
  methods: {
    // change page to pagination select teacher list
    gotoPage(page) {
      if (page > this.data.pages) {
        page = this.data.pages
      }
      teacherApi.getTeacherList(page, 8)
        .then(response => {
          this.data = response.data.data
        })
    }

  }

};
</script>
<style>
.undisable {
  pointer-events: none;
}
</style>
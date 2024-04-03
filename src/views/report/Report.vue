<template>
    <div class="report-background">
        <div class="main-report">
            <div class="container mx-auto p-8">
                <div class="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
                    <div class="md:flex">
                        <div class="w-full p-5">
                            <div class="text-center mb-6">
                                <h3 class="report-title">유저 신고하기</h3>
                            </div>
                            <div>
                                <form @submit.prevent="summitReport">
                                    <div>
                                        <label class="report-status" for="category">신고 상태</label>
                                        <select id="category" class="report-status-category"
                                            v-model="UserReportRequest.reportStatus" required>
                                            <option v-for="(value, key) in reportStatus" :key="key" :value="key">
                                                {{ value }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="report-nickname-css">
                                        <label class="report-nickname" for="nickname">닉네임</label>
                                        <input class="report-nickname-text" id="nickname" type="text"
                                            placeholder="Enter your nickname"
                                            v-model="UserReportRequest.reportedUserNickname" required />
                                    </div>
                                    <div>
                                        <label class="report-content" for="report-content">신고할 내용</label>
                                        <textarea class="report-content-text" rows="10" id="report-content"
                                            placeholder="Describe the issue" v-model="UserReportRequest.content"
                                            required></textarea>
                                    </div>
                                    <div class="report-button">
                                        <button class="report-button-text" type="submit">
                                            신고하기
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { apiClient } from "@/index"

const ReportStatus = Object.freeze({
    SPAM: "스팸",
  HARMFUL: "유해한 내용",
  ILLEGAL: "불법적인 내용"
})

export default {
    data() {
        return {
            report: [],
            UserReportRequest: {
                reportedUserNickname: '',
                reportStatus: 'SPAM, HARMFUL, ILLEGAL',
                content: ''
            },
        };
    },
    mounted() {
    },
    computed: {
        reportStatus() {
            return ReportStatus;
        }
    },
    methods: {
        async summitReport() {
            const response = await apiClient.post(
                "/api/reports/users", { reportedUserNickname: this.UserReportRequest.reportedUserNickname, reportStatus: this.UserReportRequest.reportStatus, content: this.UserReportRequest.content }
            );
            alert("신고 접수하였습니다.")
        }
    },
};
</script>

<style>
.main-report {
    max-width: 350px;
    width: 100%;
    height: 520px;
    padding: 20px;
    display: flex;
    flex-direction: row;
    border-radius: 20px;
    position: relative;
    color: #333;
}

.container {
    box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .1);
}

h3 {
    color: #333;
    margin: 10px;
}

label {
    margin-bottom: .5rem;
}

.report-status,
.report-nickname,
.report-content {
    margin: 1000px 10px 10px 10px;
    padding: 10px;
}

.report-nickname-text {
    width: 81%;
    background-color: #edf2f7;
    color: #1a202c;
    margin: 20px;
    border: 2px solid #edf2f7;
    background-color: rgba(255, 255, 255, 0.7);
    transition: border-color .3s, box-shadow .3s;
}

.report-content-text {
    width: 85%;
    background-color: #edf2f7;
    color: #1a202c;
    margin: 20px;
    border: 2px solid #edf2f7;
    background-color: rgba(255, 255, 255, 0.7);
    transition: border-color .3s, box-shadow .3s;
}

.report-nickname-css {
    padding: 10px 0px 10px 0px;
}



.report-button-text {
    width: 90%;
    margin: 15px;
    height: 45px;
    background-color: rgb(255, 176, 176);
    border: 2px solid #edf2f7;
    border-radius: 10px;

}

.report-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, #d5f4e6, #b9d6fc, #b3ffe8);
    background-size: 200% 200%;
    animation: gradientAnimation 5s linear infinite;
    display: flex;
    justify-content: center;
    align-items: center;
}

@keyframes gradientAnimation {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
</style>
import http from "../http-common";

class typingTestApi {
    getActiveParagraph() {
        return http.get("/get/paragraph");
    }

    getAllResults() {
        return http.get("/get/results");
    }
    
    setActiveParagraph(newParagraph) {
        return http.post(`/insert/paragraph/${newParagraph}`);
    }

    setTypingResults(resultObject) {
        return http.post("/insert/results", resultObject);
    }

    deleteResult(id) {
        return http.delete(`/delete/result/${id}`, id);
      }
}

const api = new typingTestApi();
export default api;

interface GlobalDataObjectV2 {
  [key: string]: number | string | {};
}


const apiResponse = {
  /**
   * Success request response structure
   * @param data
   */
  success(data: object) {
    return data;
  },

  /**
   * Error response to user
   * @param code
   * @param title
   * @param detail
   */
  error(code: string, title: string, detail?: GlobalDataObjectV2 | undefined) {
    return {
      code,
      title,
      detail
    };
  }
};

export default apiResponse;
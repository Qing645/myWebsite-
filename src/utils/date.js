export default function(timestamp) {
    const default_date = timestamp ? new Date(+timestamp) : new Date();
      
     //得到日期
      const month = (default_date.getMonth() + 1).toString().padStart(2, "0");
      const day = default_date
        .getDate()
        .toString()
        .padStart(2, "0");
       let date = `${default_date.getFullYear()}-${month}-${day}`;

    //得到时间
      const hour = default_date
        .getHours()
        .toString()
        .padStart(2, "0");
      const minute = default_date
        .getMinutes()
        .toString()
        .padStart(2, "0");
      const second = default_date
        .getSeconds()
        .toString()
        .padStart(2, "0");
      let time = ` ${hour}:${minute}:${second}`;

    return {
      date,
      time
    }
  }
  
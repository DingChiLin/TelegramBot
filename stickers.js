const stickers = {
  // 呆呆
  "wow" : "CAADBQADUgADJZO8Fktt4y20_XaQAg",
  "wow!" : "CAADBQADTwADJZO8FuiRZOTanyWEAg",
  "daidai" : "CAADBQADRQADJZO8FsuhYE3anrL-Ag",
  "發呆" : "CAADBQADRQADJZO8FsuhYE3anrL-Ag",
  "不是啦" : "CAADBQADWAADJZO8FtYitNHmINGRAg",
  "小船" : "CAADBQADQgADJZO8FgLpaOzNVstKAg",
  "愛媽咪" : ["r",
    "CAADBQADNTcAAtcdiwaZRcqcwt_kvgI",
    "CAADBQADUwADJZO8Fo7pCfpIWVdjAg",
  ],

  // 蠢熊熱戀
  "拍拍" : "CAADBQADngMAAqxU0wVDxkN1COunKQI",
  "想抱抱" : "CAADBQADkAMAAqxU0wV0HCnSoDDpHQI",
  "想親親" : "CAADBQADkQMAAqxU0wVSFsUx48pxAQI",
  "摸摸頭" : "CAADBQADnQMAAqxU0wVqSAU0STD01AI",
  "抱抱" : "CAADBQADnAMAAqxU0wXSslTisUXynAI",
  "騷你癢" : "CAADBQADhAQAAtgGigRI4umjpXWDjwI",
  "打打鬧鬧" : "CAADBQADagQAAtgGigST8ITqDcFkEwI",
  "啾" : "CAADBQADrgMAAqxU0wXk9aQD0BS_VgI",
  "寶貝" : "CAADBQADoAMAAqxU0wXyTPqMjROVIAI",
  "咬咬咬" : "CAADBQADsgMAAqxU0wVT3QfZMZ8GyAI",
  "想摸頭" : "CAADBQADkgMAAqxU0wWw8D13NS0IcwI",

  // 蠢熊1
  "在等" : "CAADAQADhhAAAvoPCRSYFlEAASQ_FEMC",
  "贊成" : "CAADAQADnhAAAvoPCRSBPyCtg_UR-gI",
  "反對" : "CAADAQADnRAAAvoPCRQ9GSIFooLZ8QI",
  "得意" : "CAADAQADmhAAAvoPCRQ7b0MLbPUViAI",
  "一起玩" : "CAADAQADoBAAAvoPCRQ_6kLbICR12gI",
  "到家" : "CAADAQADoRAAAvoPCRRLRV_eX0bixwI",

  // 蠢熊2
  "厲害的人" : "CAADBQADLwADGmbGFWQ7aCEmtuCWAg",
  "不用擔心" : "CAADBQADLAADGmbGFbzAX3Kv7PXIAg",
  "在思考" : "CAADBQADMwADGmbGFY-kQYik3aszAg",
  "沒辦法" : "CAADBQADNwADGmbGFWxwCUNkstKtAg",
  "緊張" : "CAADBQADPwADGmbGFdFnz5hgv87kAg",
  "需要抱" : "CAADBQADRgADGmbGFYxcZuwU5UtFAg",
  "想撒嬌" : "CAADBQADUAADGmbGFc93MxKQO7ynAg",
  "沒有想很多" : "CAADBQADRAADGmbGFYVyYZ0DGfEtAg",
  "不想工作" : "CAADBQADRwADGmbGFUz6gyzuxXI_Ag",
  "害羞" : "CAADBQADSwADGmbGFVSLaFI0CjlRAg",
  "想講電話" : "CAADBQADSgADGmbGFU5LHiRc7f1tAg",

  // 蠢熊3
  "擔心的人" : "CAADBQAD6wADJeDrDiEMJ04IPh1gAg",
  "想見" : "CAADBQAD4AADJeDrDuVaBhJQX1Y3Ag",
  "支持" : "CAADBQAD5gADJeDrDmbm7kcLw8a1Ag",
  "好開心" : "CAADBQAD6AADJeDrDhXfqjSCo0rEAg",
  "期待" : "CAADBQAD5wADJeDrDudzDQaSRGVOAg",
  "嚇到" : "CAADBQAD9gADJeDrDitB1lcQyz5FAg",
  "寂寞" : "CAADBQAD8QADJeDrDgx06YDd1TjaAg",
  "努力" : "CAADBQAEAQACJeDrDpdd9F7ZvuQdAg",

  // 蠢熊3.5
  "踢踢" : ["r", "CAADBQADdAADSkiSDSBl-MQnOSnwAg", "CAADBQADPAAD10JZFXfWhUXxM12mAg"],
  "躺下" : "CAADBQADPQAD10JZFWBiigu8ftRPAg",
  "爬起" : "CAADBQADPgAD10JZFUH2OAfH9UzDAg",
  "滾滾" : "CAADBQADPwAD10JZFZdGN0nG8907Ag",
  "倒下" : "CAADBQADQAAD10JZFXXYetnHn5BMAg",
  "走來走去" : ["s", "CAADBQADRgAD10JZFXDN9YPQHVgiAg", "CAADBQADRwAD10JZFQbZlU1vUlz6Ag"],
  "跳來跳去" : ["s", "CAADBQADSAAD10JZFUNlohbgBVuQAg", "CAADBQADSQAD10JZFTcoXgAB7VdpUgI"],
  "滾來滾去" : ["r", "CAADBQADPwAD10JZFZdGN0nG8907Ag", "CAADBQADLgQAAiXg6w6257LuVUPhGAI"],
  "寫字" : "CAADBQADSwAD10JZFRyVzUz939XzAg",
  "擦擦" : "CAADBQADTAAD10JZFSUG8nCi0HHAAg",
  "隱形" : "CAADBQADTgAD10JZFS8Tjh0Pz1VUAg",
  "微笑" : "CAADBQADUwAD10JZFb2Ho9woqyVuAg",
  "含淚" : "CAADBQADVAAD10JZFaA1yv0GpNi0Ag",
  "抓住" : "CAADBQADWAAD10JZFQABAmuOb1ws6gI",
  "飛走" : "CAADBQADWQAD10JZFZhpu6UJ8hH2Ag",

  // 蠢熊4
  "復活" : "CAADBQADUwEAAkV-thfZ5EDqz53uwQI",
  "工作中" : "CAADBQADWwEAAkV-thfIPij-PNxprgI",
  "不年輕" : "CAADBQADYAEAAkV-thfJ4T028H192QI",
  "去吃飯" : "CAADBQADXQEAAkV-thcJpt7gsw2hFwI",
  "好像是" : "CAADBQADdAEAAkV-thdHnl1bkzsTJwI",
  "神仙" : "CAADBQADegEAAkV-thdw0kNTvEfZaAI",
  "聽不到" : "CAADBQADeAEAAkV-thcu5BLOanTKlQI",

  // 蠢熊5
  "無關" : "CAADBQADfwEAAkV-thenoQuKYoI6ZwI",
  "同意" : "CAADBQADhAEAAkV-thdI27GYHsaH4QI",
  "覺得不錯" : "CAADBQADiQEAAkV-thds4aIi-WncvgI",
  "不要啦" : "CAADBQADjQEAAkV-theORFHiAYOvMQI",
  "肚子痛" : "CAADBQADiwEAAkV-theBpXq2-s_OXQI",
  "抱怨" : "CAADBQADlQEAAkV-thcTSgmwjOxmHwI",
  "哪有" : "CAADBQADlAEAAkV-thcVK2qbMMobLAI",
  "極限" : "CAADBQADnQEAAkV-thd2xxUojtGeHQI",
  "加油" : "CAADBQADnAEAAkV-thfHboQMYFyOlwI",
  "又來了" : "CAADBQADmQEAAkV-thfK0YPT8a5nUwI",
  "想當初" : "CAADBQADmwEAAkV-the9QUO8FeKC_AI",
  "勉強" : "CAADBQADoQEAAkV-thcNBjMftO6v6AI",
  "垃圾" : "CAADBQADlwEAAkV-thdHC4V5YMCZIwI",
  "弄啊弄" : "CAADBQADlgEAAkV-thfjYv807fNgtAI",
  "好飽" : "CAADBQADigEAAkV-thcuOY5cjVXAqQI",
  "想玩" : "CAADBQADkAEAAkV-thfdqLlMy0js4AI",
  "休息" : "CAADBQADkwEAAkV-thckCgVmgzppvgI",
  "煩惱" : "CAADBQADiAEAAkV-thcNeEFlVCz_jAI",

  // 蠢熊6
  "回家" : "CAADBQADLgADvGm5DGWrjTs1uS7RAg",
  "不關我的事" : "CAADBQADLQADvGm5DG5GcXooR7A2Ag",
  "放棄" : "CAADBQADPwADvGm5DP0cWAABZZQlsAI",
  "怎麼辦" : "CAADBQADRwADvGm5DFVDiXLXDrgRAg",
  "歡迎撒嬌" : "CAADBQADSAADvGm5DBBf2jMkoti3Ag",
  "笑一個" : "CAADBQADSgADvGm5DFBOzMJbF2BMAg",
  "不要逞強" : "CAADBQADTAADvGm5DCHrFuwhLCNUAg",
  "老練" : "CAADBQADOwADvGm5DGqK7bkLmkudAg",
  "歪了" : "CAADBQADUAADvGm5DF2MqIksQeymAg",
  "說一次" : "CAADBQADQQADvGm5DDiTwwwIb63-Ag",

  // 蠢熊 6.5
  "耶耶耶" : "CAADBQADTgIAAiXg6w4h5Z1b4HPMTgI",

  // 熱戀
  "棋棋在你身邊" : "CAADBQADlQkAAtgqVg2vdJz7LqpgYwI",
  "棋棋想你" : "CAADBQADgQkAAtgqVg3qbS_9CtkuVQI",

  // 熱戀
  "棋棋愛你" : ["r"
    "CAADBQADZb0AAkZlEQLDFrEtIyuWpwI",
    "CAADBQADfr0AAkZlEQJQ-f_GRu33-QI",
    "CAADBQADib0AAkZlEQIiUwgDmLPJXwI",
    "CAADBQADjQkAAtgqVg3rTyeyr5YVbgI",
    "CAADBQADkwkAAtgqVg3spa0hfEu3qAI",
    "CAADBQADcwkAAtgqVg2fJrsRBVqP7gI",
    "CAADBQADoQkAAtgqVg3x1mZlbZneegI",
  ],

  // 圖組
  "晚安" : ["r",
    "CAADBQADNwADvGm5DNzJ-OQlsOtiAg",
    "CAADBQADIAADJZO8FtVJXEG4oDHNAg",
    "CAADBQADBBQAAqE22Qbfoj_d2oVxWwI",
    "CAADBQADSAADJZO8FmxsDbqQgC8zAg",
    "CAADBAADnQADL8mpBJsTCJf5vnFRAg",
    "CAADBQADrQMAAunDNAfpWOCZTd34QwI",
    "CAADBQADkQgAAnCLwQHDrsyyCHJdrAI",
    "CAADBQADogkAAnCLwQHOpYaWB7ZguQI",
    "CAADBQADxAIAAqeJzgPluzj98M1SEQI",
    "CAADBQADJwEAAl79hgi-PsHZgWsQJQI",
    "CAADBQADkQgAAr3wIARgJUHTUhsfGgI",
    "CAADBQAD3gEAAqt6YwEEnL8FHdB7ngI",
    "CAADBQAD1QIAArpIEQekGlvxO1Z7FAI",
    "CAADBQAD2QIAArpIEQcZgBT9e2pnvwI",
    "CAADBQADiQADxlHGFRS5X8IVM79CAg",
    "CAADBQADJQ0AAp1yBAeaF19sfJ01XwI",
    "CAADBQADogIAAiXg6w7-NrzqwJglAwI",
    "CAADAgAD9ksAAuCjggfA8Y22jXsHVwI",
    "CAADBQADMQIAAiXg6w4F9he5xQWBSQI",
    "CAADAgAD8ksAAuCjggfiLw1chxolsgI",
  ],

  "洗澡" : ["r",
    "CAADBQADiBYAAp7UXgPQB-SoNmVviwI",
    "CAADBQADkgEAAl79hgjdfiFqgUOSWgI",
    "CAADBQADXAEAAkV-thdGwo1gavtO4wI",
    "CAADBQADCgIAAiXg6w6XXSBunS9tZgI",
    "CAADBQAD1wEAAiXg6w48TJCC7vvMVAI",
    "CAADBQADvwEAAiXg6w4eII6t4vBEnQI",
    "CAADAQADEAEAAgWz8BtK676YxEjLyQI",
    "CAADAQADCQEAAgWz8Bv3jiukYXkWygI",
    "CAADBQADjwIAAiXg6w6zz3LoFwfdfAI",
  ],

  "好熱" : ["r",
    "CAADBQADUQADJyP9GTFUMvCHtgQqAg",
    "CAADBQADRQADJyP9Gc75luqGZ5YrAg",
    "CAADBQADZQIAAiXg6w5OQH3-N0hvVAI",
    "CAADBQADBgADGmbGFe86tIW6fy8pAg",
    "CAADBQADBwADGmbGFUVnt--NuGuFAg",
    "CAADBQADCAADGmbGFdHGOzTevRteAg",
    "CAADBQADCQADGmbGFYTVbR-qjcMXAg",
    "CAADBQADDAADGmbGFY_OubHj4r3gAg",
    "CAADBQADjwEAAkV-theE7fjiB50f4AI",
    "CAADBQAD9xYAAp7UXgNvmdxb-4JcjQI",
    "CAADBQAD8xYAAp7UXgMlKnGEdmW42gI",
    "CAADBQADTwADJyP9GZ_U8Wy7Vem8Ag",
  ],
}

module.exports = stickers


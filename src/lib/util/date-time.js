export const longAgo = (p) => {
  if (!p) return;

  let now = new Date();
  let ago = new Date(p);

  let diff = (now - ago) / 1000; // second

  let date = [
    [60 * 60 * 24 * 30 * 12, "tahun"],
    [60 * 60 * 24 * 30, "bulan"],
    [60 * 60 * 24, "hari"],
    [60 * 60, "jam"],
    [60, "menit"],
  ];

  let result;
  date.map((d) => {
    let ceil = Math.ceil(diff / d[0]);
    if (result) return;
    if (ceil > 1) {
      result = `${ceil} ${d[1]} lalu`;
    }
  });

  return result;
};

export const getPartDateTime = (p) => {
  if (!p) return;
  let d = new Date(p);

  const formatted = (opt) => {
    return new Intl.DateTimeFormat("id-ID", opt).format(d);
  };

  // day: "numeric",
  // month: "short",
  // year: "numeric",
  // hour: "2-digit",
  //     minute: "2-digit",

  let year = formatted({ year: "numeric" });
  let month = formatted({ month: "short" });
  let day = formatted({ day: "numeric" });
  let hour = formatted({ hour: "2-digit" });
  let minute = formatted({ minute: "2-digit" });

  return { month, year, day, hour, minute };
};

export const formatInputDate = (p) => {
  let d = p ? new Date(p) : new Date();
  d = new Intl.DateTimeFormat("fr-CA").format(d);
  return d;
};

export const formatInputTime = (p) => {
  let d = p ? new Date(p) : new Date();
  d = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
  }).format(d);
  return d + ":00";
};

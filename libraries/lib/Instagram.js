 const axios = require('axios');
 const cheerio = require('cheerio');
 
      async function igdownloadz(url) {
           try {
                const form = new URLSearchParams();
                form.append("q", url);
                form.append("vt", "home");
                const { data } = await axios.post('https://yt5s.io/api/ajaxSearch', form, {
                    headers: {
                        "Accept": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                });
                if (data.status !== "ok") throw new Error("Gagal mengambil data.");
                const $ = cheerio.load(data.data);
                if (/^(https?:\/\/)?(www\.)?(facebook\.com|fb\.watch)\/.+/i.test(url)) {
                    const thumb = $('img').attr("src");
                    let links = [];
                    $('table tbody tr').each((_, el) => {
                        const quality = $(el).find('.video-quality').text().trim();
                        const link = $(el).find('a.download-link-fb').attr("href");
                        if (quality && link) links.push({ quality, link });
                    });
                    if (links.length === 0) throw new Error("Tidak ada video yang dapat diunduh.");

                    return { platform: "facebook", thumb, video: links[0].link };
                } else if (/^(https?:\/\/)?(www\.)?(instagram\.com\/(p|reel)\/).+/i.test(url)) {
                    const video = $('a[title="Download Video"]').attr("href");
                    const thumb = $('img').attr("src");
                    if (!video || !thumb) throw new Error("Video tidak ditemukan.");
                    return { platform: "instagram", thumb, video };
                } else {
                    throw new Error("URL tidak valid. Gunakan link Facebook atau Instagram.");
                }
            } catch (error) {
                return { error: error.message };
            }
        }

module.exports = { igdownloadz };


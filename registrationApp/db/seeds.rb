# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

admin = Role.create(role: "admin")

a1 = User.create(username: "admin", email: "admin@app.se", password: "admin123", password_confirmation: "admin123")
User.create(username: "stoffe", email: "kim@app.se", password: "hej123", password_confirmation: "hej123")

Apikey.create(device: "stoffe laptop", tmp_user_id: 2)

a1.roles << admin

creator = Creator.create(firstname: "Kristoffer", lastname: "Svensson", username:"stoffe", password: "hej123")

tag1 = Tag.create(name: "Bästa ölen i stan")
tag2 = Tag.create(name: "Billigaste ölen i stan")
tag3 = Tag.create(name: "Skotsk Pub")
tag4 = Tag.create(name: "Irländsk Pub")
tag5 = Tag.create(name: "Äckel Pub")
tag6 = Tag.create(name: "God mat")

event1 = Event.create(address: "Stortorget 14", zip_code: "39231", city: "Kalmar", name: "Pipes of Scotland", creator: creator)
event2 = Event.create(address: "Larmtorget 7", zip_code: "39232", city: "Kalmar", name: "Krögers", creator: creator)
event3 = Event.create(address: "Larmgatan 8", zip_code: "39232", city: "Kalmar", name: "O´Reillys", creator: creator)
event4 = Event.create(address: "Skeppsbrogatan 12", zip_code: "39231", city: "Kalmar", name: "Stars and Stripes", creator: creator)
event5 = Event.create(address: "Larmtorget 4", zip_code: "39232", city: "Kalmar", name: "O´Learys", creator: creator)
event6 = Event.create(address: "Kungsportsavenyen 10", zip_code: "41136", city: "Göteborg", name: "Hard Rock Cafe", creator: creator)
event7 = Event.create(address: "Kungsportsavenyen 32", zip_code: "41136", city: "Göteborg", name: "Ölstugan Tullen Avenyn", creator: creator)
event8 = Event.create(address: "Ågatan 12", zip_code: "37436", city: "Karlshamn", name: "Harrys", creator: creator)
event9 = Event.create(address: "Varvsgatan 1", zip_code: "37435", city: "Karlshamn", name: "Hotellbaren", creator: creator)

event1.tags << tag1
event1.tags << tag3
event1.tags << tag6
event2.tags << tag1
event3.tags << tag4
event3.tags << tag1
event3.tags << tag6
event4.tags << tag2
event5.tags << tag2
event6.tags << tag6
event6.tags << tag1
event7.tags << tag1
event7.tags << tag2
event8.tags << tag5
event8.tags << tag2
event9.tags << tag1
event9.tags << tag6




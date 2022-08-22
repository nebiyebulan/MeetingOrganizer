import datetime
from DatabaseConnect import db, ma, app
from datetime import timedelta
from datetime import datetime

class DateTime(db.TypeDecorator):
    impl = db.DateTime

    def process_bind_param(self, value, dialect):
        if type(value) is str:
            return datetime.now().strptime(value, '%d-%m-%YT%H:%M:%S')
        return value

class MeetingRegisterForm(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ToplantiKonusu = db.Column(db.String(), nullable=False)
    Tarih = db.Column(db.Integer, nullable=False)
    BaslangicSaati = db.Column(DateTime, nullable=False)
    BitisSaati = db.Column(DateTime, nullable=False)
    Katilimcilar = db.Column(db.String(), nullable=False)

    def __init__(self, ToplantiKonusu, Tarih, BaslangicSaati, BitisSaati, Katilimcilar):
        self.ToplantiKonusu = ToplantiKonusu
        self.Tarih = (Tarih if Tarih else datetime.utcnow() + timedelta(days=30) + timedelta(hours=3))
        self.BaslangicSaati = BaslangicSaati
        self.BitisSaati = BitisSaati
        self.Katilimcilar = Katilimcilar

class MeetingRegisterFormSchema(ma.Schema):
    class Meta:
        fields = (
            'id', 'ToplantiKonusu', 'Tarih', 'BaslangicSaati', 'BitisSaati', 'Katilimcilar')


meetingregisterform_schema = MeetingRegisterFormSchema()
meetingregisterforms_schema = MeetingRegisterFormSchema(many=True)


if __name__ == '__main__':
    app.run(debug=True, port=8000)
from flask import request, jsonify
from entities import MeetingRegisterForm, meetingregisterform_schema
from DatabaseConnect import app, db
from flask_cors import cross_origin


@app.route('/MeetingForm/Register', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def add_meetingform():
    ToplantiKonusu = request.json['ToplantiKonusu']
    Tarih = request.json['Tarih']
    BaslangicSaati = request.json['BaslangicSaati']
    BitisSaati = request.json['BitisSaati']
    Katilimcilar = request.json['Katilimcilar']

    new_meetingform = MeetingRegisterForm(ToplantiKonusu, Tarih, BaslangicSaati, BitisSaati, Katilimcilar)

    db.session.add(new_meetingform)
    db.session.commit()
    return meetingregisterform_schema.jsonify(new_meetingform)

# get all meetingform
@app.route('/MeetingForm/GetAll', methods=['GET'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def get_meetingforms():
    all_meetingform = MeetingRegisterForm.query.all()
    output = []
    for form in all_meetingform:
           output.append({
            'id': form.id,
            'ToplantiKonusu': form.ToplantiKonusu,
            'Tarih': form.Tarih,
            'BaslangicSaati': form.BaslangicSaati,
            'BitisSaati': form.BitisSaati,
            'Katilimcilar': form.Katilimcilar,
        })
    return jsonify(output)

@app.route('/MeetingForm/Get/<id>', methods=['GET'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def get_meetingform(id):
    form = MeetingRegisterForm.query.get(id)
    return meetingregisterform_schema.jsonify(form)

@app.route('/MeetingForm/Update/<id>', methods=['POST'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def update_meetingform(id):
    form = MeetingRegisterForm.query.get(id)
    ToplantiKonusu = request.json['ToplantiKonusu']
    Tarih = request.json['Tarih']
    BaslangicSaati = request.json['BaslangicSaati']
    BitisSaati = request.json['BitisSaati']
    Katilimcilar = request.json['Katilimcilar']

    form.ToplantiKonusu = ToplantiKonusu
    form.Tarih = Tarih
    form.BaslangicSaati = BaslangicSaati
    form.BitisSaati = BitisSaati
    form.Katilimcilar = Katilimcilar

    db.session.commit()
    return meetingregisterform_schema.jsonify(form)

@app.route('/MeetingForm/Delete/<id>', methods=['POST'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def delete_meetingform(id):
    form = MeetingRegisterForm.query.get(id)
    db.session.delete(form)
    db.session.commit()
    return meetingregisterform_schema.jsonify(form)


if __name__ == '__main__':
    app.run(debug=True, port=8000)
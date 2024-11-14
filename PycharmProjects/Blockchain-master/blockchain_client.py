from random import random
from flask import Flask, render_template, request, redirect, jsonify #Converts Python dictionaries or lists into JSON responses
from Cryptodome.Random import get_random_bytes
import binascii
from collections import OrderedDict #is a dictionary subclass that maintains the order of the keys
from Cryptodome.PublicKey import RSA
from Cryptodome.Signature import PKCS1_v1_5 # implementation of the RSA signature scheme
from Cryptodome.Hash import SHA



class Transaction: #a blockchain transaction
    def __init__(self,sender_public_key,sender_private_key,
                 recipient_public_key,amount): ##instance variables, making them accessible throughout the class
        self.sender_public_key = sender_public_key
        self.sender_private_key = sender_private_key
        self.recipient_public_key = recipient_public_key
        self.amount = amount
    def to_dict(self): #method converts the transaction object into an ordered dictionary for easier serialization into JSON format
        return OrderedDict({ 
            'sender_public_key':self.sender_public_key,
            'recipient_public_key':self.recipient_public_key,
            'amount':self.amount
        })
    def sign_transaction(self):
        private_key = RSA.importKey(binascii.unhexlify(self.sender_private_key)) #sender’s private key is imported and converted from hexadecimal format
        signer = PKCS1_v1_5.new(private_key)
        h = SHA.new(str(self.to_dict()).encode('utf8'))
        return binascii.hexlify(signer.sign(h)).decode('ascii') #The transaction hash is signed using the RSA private key, and the signature is returned in hexadecimal format
app = Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')
@app.route('/make/transaction')
def make_transaction():
    return render_template('make_transaction.html')
@app.route('/view/transactions')
def view_transaction():
    return render_template('view_transactions.html')
@app.route('/generate/transaction', methods=['POST'])
def generate_transaction():
    sender_public_key = request.form['sender_public_key']
    sender_private_key = request.form['sender_private_key']
    recipient_public_key = request.form['recipient_public_key']
    amount = request.form['amount']
    transaction = Transaction(sender_public_key,sender_private_key,recipient_public_key,amount)
    response = {'transaction':transaction.to_dict(),
                'signature':transaction.sign_transaction()}
    return jsonify(response),200
@app.route('/wallet/new')
def new_wallet():
    random_gen = get_random_bytes # generate secure random numbers
    private_key = RSA.generate(1024, random_gen) #private key is generated
    public_key = private_key.publickey() #corresponding public key is derived

    response = { #returned in JSON response
        'private_key': binascii.hexlify(private_key.exportKey(format='DER')).decode('ascii'),
        'public_key': binascii.hexlify(public_key.exportKey(format='DER')).decode('ascii')
    }
    return jsonify(response),200
if __name__ == '__main__':
    from argparse import ArgumentParser
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port
    app.run(host='0.0.0.0', port=port, debug=True)

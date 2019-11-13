# from serial import Serial
import serial
import time
import string
from flask import Flask, render_template
from flask_cors import CORS, cross_origin

all_bytes = string.maketrans('', '')  # String of 256 characters with (byte) value 0 to 255

def strip_control_characters(input):

    if input:
        import re
        # unicode invalid characters
        RE_XML_ILLEGAL = u'([\u0000-\u0008\u000b-\u000c\u000e-\u001f\ufffe-\uffff])' + \
                         u'|' + \
                         u'([%s-%s][^%s-%s])|([^%s-%s][%s-%s])|([%s-%s]$)|(^[%s-%s])' % \
                          (unichr(0xd800),unichr(0xdbff),unichr(0xdc00),unichr(0xdfff),
                           unichr(0xd800),unichr(0xdbff),unichr(0xdc00),unichr(0xdfff),
                           unichr(0xd800),unichr(0xdbff),unichr(0xdc00),unichr(0xdfff),
                           )
        input = re.sub(RE_XML_ILLEGAL, "", input)

        # ascii control characters
        input = re.sub(r"[\x01-\x1F\x7F]", "", input)

    return input

app = Flask(__name__)
@app.route('/', methods=['GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def index():
	ser = serial.Serial('/dev/ttyUSB0', 4800)
	print('Lendo a balanca')
	result = '0'
	b=0
	a=0
	while a<320:
		ser.write(b'\x05')
		line = ser.read(02)
		line2 = ser.read(03)
		line = strip_control_characters(line)
		line2 = strip_control_characters(line2)
		line3 = line+line2
		
		if len(line3) == 5:
			if result != line3 and line3.isdigit() and line3 != '00000':
				result = line3
				print(result)
			elif line3 == '00000':
				print('zero')
				b+=1
			else:
				print('calculando -> {}'.format(a))
		a += 1
		time.sleep(0.001)
	if b == 46:
		result='0'
	return result
if __name__ == '__main__':
 	app.run()
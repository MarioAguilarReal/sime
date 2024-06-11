<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controllers;
use App\Models\Student;
use App\Models\Comments;

class ApiCommentsController extends Controller
{
	public function register(Request $request, $id){
		$response = [
			'status' => 0,
			'message' => '',
			'comments' => ''
		];

		$request->validate([
			//'commentType' => 'required',
			'comment' => 'required',
			'by' => 'required',
			'userRoleCreator' => 'required',
			'idStudent' => 'required',
		]);

		$student = Student::find($id);
		if(!$student){
			$response['status'] = 201;
			$response['message'] = 'No student found';
			return response()->json($response, $response['status']);
		}

		$comments = Comments::create ([
			'comment' => $request->comment,
			'by' => $request->by,
			'userRoleCreator' => $request->userRoleCreator,
			'idStudent' => $request->idStudent,
		]);

		if ($request->has('commentType')){
			$comments->commentType = $request->commentType;
		}

		if ($comments){
			$student->comments_id = $comments->id;
			$student->save();
			
			$response['status'] = 200;
			$response['message'] = 'Comment registered successfully';
			$response['comments'] = $comments;
		}
		else {
			$response['status'] = 201;
			$response['message'] = 'Comment not registered';
		}
		return response()->json($response, $response['status']);
	}

	public function show($id_student){
		$response = [
			'status' => 0,
			'message' => '',
			'comments' => ''
		];

		$comments = Comments::find($id_student);
		if($comments){
			$response['status'] = 200;
			$response['message'] = 'Comments found';
			$response['comments'] = $comments;
		}
		else {
			$response['status'] = 201;
			$response['message'] = 'No comments found';
		}
		return response()->json($response, $response['status']);
	}

	public function update(Request $request, $id){
		$response = [
			'status' => 0,
			'message' => '',
			'comments' => ''
		];

		$request->validate([
			//'commentType' => 'required',
			'comment' => 'required',
			'by' => 'required',
			'userRoleCreator' => 'required',
			'idStudent' => 'required',
		]);

		$comments = Comments::find($id);

		if($comments){
			$comments->comment = $request->comment;
			$comments->by = $request->by;
			$comments->userRoleCreator = $request->userRoleCreator;
			$comments->idStudent = $request->idStudent;
	
			if ($request->has('commentType')){
				$comments->commentType = $request->commentType;
			}
			$comments->save();
			
			$response['status'] = 200;
			$response['message'] = 'Comment updated successfully';
			$response['comments'] = $comments;
		}
		else {
			$response['status'] = 201;
			$response['message'] = 'Comment not updated';
		}
		return response()->json($response, $response['status']);
	}
}

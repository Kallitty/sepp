import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import './updatequiz.scss'

const UpdateQuiz = () => {
  const [quizzes, setQuizzes] = useState([])

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('/api/quizzes')
        setQuizzes(response.data)
      } catch (error) {
        console.error('Error fetching quizzes:', error)
      }
    }

    fetchQuizzes()
  }, [])

  const handleDelete = async (id) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this quiz!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`/api/quizzes/${id}`)
          setQuizzes(quizzes.filter((quiz) => quiz.id !== id))
          swal('Poof! Your quiz has been deleted!', {
            icon: 'success',
          })
        } catch (error) {
          console.error('Error deleting quiz:', error)
          swal('Error', 'Failed to delete quiz', 'error')
        }
      }
    })
  }

  return (
    <div className='sepp__update-quizes'>
      {quizzes.map((quiz) => (
        <div key={quiz.id} className='sepp__update-quiz__quiz'>
          <div className='sepp__update-quiz--detail'>
            <div className='sepp__update-quiz--name'>
              <h5 className='sepp__update-quiz--title'>{quiz.title}</h5>
            </div>
          </div>
          <div className='sepp__update-quiz--action'>
            <Link
              to={`/admin/edit-title/${quiz.id}`}
              className='sepp__update-quiz--edit'
            >
              Edit Title
            </Link>
            <Link
              to={`/admin/edit-quiz/${quiz.id}`}
              className='sepp__update-quiz--edit'
            >
              Edit Q & A
            </Link>

            <button
              onClick={() => handleDelete(quiz.id)}
              className='sepp__update-quiz--delete'
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UpdateQuiz

// public function update(Request $request, $id)
// {
//     Log::info('Received update request', ['data' => $request->all()]);

//     $request->validate([
//         'title' => 'sometimes|string|max:255',
//         'questions' => 'sometimes|array',
//         'questions.*.id' => 'sometimes|integer|exists:questions,id',
//         'questions.*.question' => 'sometimes|string',
//         'questions.*.type' => 'sometimes|string',
//         'questions.*.correctAnswer' => 'sometimes|string',
//         'questions.*.choices' => 'sometimes|array',
//         'questions.*.choices.*' => 'sometimes|string',
//         'questions.*.icon' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
//     ]);

//     try {
//         $quiz = Quiz::findOrFail($id);
//         Log::info('Quiz found', ['quiz_id' => $quiz->id]);

//         if ($request->has('title')) {
//             $quiz->title = $request->title;
//             $quiz->save();
//             Log::info('Quiz title updated', ['title' => $quiz->title]);
//         }

//         if ($request->has('questions')) {
//             $existingQuestionIds = $quiz->questions->pluck('id')->toArray();
//             $updatedQuestionIds = [];

//             foreach ($request->questions as $questionData) {
//                 $question = isset($questionData['id']) ? Question::find($questionData['id']) : new Question();

//                 $question->question = $questionData['question'] ?? $question->question;
//                 $question->type = $questionData['type'] ?? $question->type;
//                 $question->correct_answer = $questionData['correctAnswer'] ?? $question->correct_answer;
//                 $question->quiz_id = $quiz->id;

//                 if (isset($questionData['icon']) && is_file($questionData['icon']) && $questionData['icon']->isValid()) {
//                     $path = $questionData['icon']->store('public/icons');
//                     $iconName = basename($path);
//                     $frontendPath = public_path('../../sepp/seppfrontend/public/icons');
//                     $questionData['icon']->move($frontendPath, $iconName);
//                     $question->icon = $iconName;
//                     Log::info('Icon uploaded', ['icon' => $iconName]);
//                 }

//                 $question->save();
//                 Log::info('Question saved', ['question_id' => $question->id]);
//                 $updatedQuestionIds[] = $question->id;

//                 if (isset($questionData['choices'])) {
//                     $existingChoiceIds = $question->choices->pluck('id')->toArray();
//                     $updatedChoiceIds = [];

//                     foreach ($questionData['choices'] as $choiceValue) {
//                         $choice = new Choice();

//                         if (!empty($choiceValue)) {
//                             $choice->choice = $choiceValue;
//                             Log::info('Choice data', ['choice' => $choiceValue]);
//                         } else {
//                             Log::warning('Missing choice data', ['question_id' => $question->id, 'choiceData' => $choiceValue]);
//                             continue; // Skip if choice is not set
//                         }

//                         $choice->question_id = $question->id;
//                         $choice->save();
//                         Log::info('Choice saved', ['choice_id' => $choice->id]);
//                         $updatedChoiceIds[] = $choice->id;
//                     }

//                     $choicesToDelete = array_diff($existingChoiceIds, $updatedChoiceIds);
//                     Choice::destroy($choicesToDelete);
//                 }
//             }

//             $questionsToDelete = array_diff($existingQuestionIds, $updatedQuestionIds);
//             Question::destroy($questionsToDelete);
//         }

//         return response()->json(['message' => 'Quiz updated successfully']);
//     } catch (\Exception $e) {
//         Log::error('Failed to update quiz', ['error' => $e->getMessage()]);
//         return response()->json(['message' => 'Failed to update quiz', 'error' => $e->getMessage()], 500);
//     }
// }
